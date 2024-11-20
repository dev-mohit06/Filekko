import axios from "axios";
import LocalStorage from "./local-storage";

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} status - Success status
 * @property {string} message - Response message
 * @property {any} data - Response data (can be null)
 */

class ApiClient {
    static #instance = null;

    constructor() {
        if (ApiClient.#instance) {
            return ApiClient.#instance;
        }

        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            timeout: 30000,
        });

        this.setupInterceptors();
        ApiClient.#instance = this;
    }

    static getInstance() {
        return ApiClient.#instance || new ApiClient();
    }

    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Set Content-Type dynamically
                if (!config.headers['Content-Type'] && config.data) {
                    config.headers['Content-Type'] = this.determineContentType(config.data);
                }

                // Attach token if available
                const token = LocalStorage.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(this.formatError(error))
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Handle token refresh
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newToken = await this.refreshToken();
                        if (newToken) {
                            // Update the failed request with new token
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        // If refresh fails, clear auth and redirect to login
                        this.handleAuthError();
                        return Promise.reject(this.formatError(refreshError));
                    }
                }

                return Promise.reject(this.formatError(error));
            }
        );
    }

    async refreshToken() {
        const refreshToken = LocalStorage.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await this.client.post('/auth/refresh', {
                refreshToken
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            LocalStorage.setTokens({ accessToken, refreshToken: newRefreshToken });

            return accessToken;
        } catch (error) {
            throw new Error('Token refresh failed');
        }
    }

    handleAuthError() {
        LocalStorage.clearAuth();
        window.location.href = '/login';
    }

    formatError(error) {
        if (error.response) {
            // Server responded with error
            const message = error.response.data?.message || 'An unexpected error occurred';
            const status = error.response.status;
            const errorObj = new Error(message);
            errorObj.status = status;
            errorObj.data = error.response.data;
            return errorObj;
        }

        if (error.request) {
            // Request made but no response received
            const errorObj = new Error('No response from server');
            errorObj.status = 0;
            return errorObj;
        }

        // Request setup error
        const errorObj = new Error('Request configuration error');
        errorObj.status = -1;
        return errorObj;
    }

    async request(config) {
        try {
            const response = await this.client(config);
            return response.data;
        } catch (error) {
            throw error; // Already formatted by interceptor
        }
    }

    async get(url, config = {}) {
        return this.request({ ...config, method: 'GET', url });
    }

    async post(url, data = null, config = {}) {
        return this.request({ ...config, method: 'POST', url, data });
    }

    async put(url, data = null, config = {}) {
        return this.request({ ...config, method: 'PUT', url, data });
    }

    async delete(url, config = {}) {
        return this.request({ ...config, method: 'DELETE', url });
    }

    determineContentType(data) {
        if (data instanceof FormData) return 'multipart/form-data';
        if (data instanceof URLSearchParams) return 'application/x-www-form-urlencoded';
        if (typeof data === 'object' && data !== null) return 'application/json';
        return 'text/plain';
    }
}

export const apiClient = ApiClient.getInstance();