import axios from "axios";
import { localStorageService } from "./local-storage.js";

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

    /**
     * Get singleton instance
     * @returns {ApiClient}
     */
    static getInstance() {
        if (!ApiClient.#instance) {
            ApiClient.#instance = new ApiClient();
        }
        return ApiClient.#instance;
    }

    /**
     * Determine content type based on data
     * @param {any} data - Request data
     * @returns {string} Content-Type header value
     */
    determineContentType(data) {
        if (data instanceof FormData) {
            return 'multipart/form-data';
        }
        if (data instanceof URLSearchParams) {
            return 'application/x-www-form-urlencoded';
        }
        if (typeof data === 'object' && data !== null) {
            return 'application/json';
        }
        return 'text/plain';
    }

    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Set dynamic content type if not already set
                if (!config.headers['Content-Type'] && config.data) {
                    config.headers['Content-Type'] = this.determineContentType(config.data);
                }

                // Get token from LocalStorageService
                const token = localStorageService.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Handle 401 Unauthorized
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newToken = await this.refreshToken();
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        this.handleAuthError();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    async refreshToken() {
        try {
            const authState = localStorageService.getAuthState();
            if (!authState?.refreshToken) {
                return null;
            }

            const response = await this.client.post('/auth/refresh', {
                refreshToken: authState.refreshToken
            });

            const newToken = response.data.token;
            localStorageService.saveAuthState({
                ...authState,
                token: newToken
            });

            return newToken;
        } catch (error) {
            return null;
        }
    }

    handleAuthError() {
        localStorageService.clearAuth();
        window.location.href = '/login';
    }

    handleError(error) {
        if (error.response) {
            // Server responded with error
            const message = error.response.data.message || 'An unexpected error occurred';
            const customError = new Error(message);
            customError.status = error.response.status;
            customError.data = error.response.data;
            return customError;
        } else if (error.request) {
            // Request made but no response received
            return new Error('No response received from server');
        } else {
            // Error in request configuration
            return new Error('Error in request configuration');
        }
    }

    /**
     * Generic request method
     * @param {Object} config - Axios request configuration
     * @returns {Promise<ApiResponse>}
     */
    async request(config) {
        try {
            const response = await this.client(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * GET request
     * @param {string} url - Endpoint URL
     * @param {Object} config - Additional configuration
     * @returns {Promise<ApiResponse>}
     */
    async get(url, config = {}) {
        return this.request({ ...config, method: 'GET', url });
    }

    /**
     * POST request
     * @param {string} url - Endpoint URL
     * @param {any} data - Request payload
     * @param {Object} config - Additional configuration
     * @returns {Promise<ApiResponse>}
     */
    async post(url, data = null, config = {}) {
        return this.request({ ...config, method: 'POST', url, data });
    }

    /**
     * PUT request
     * @param {string} url - Endpoint URL
     * @param {any} data - Request payload
     * @param {Object} config - Additional configuration
     * @returns {Promise<ApiResponse>}
     */
    async put(url, data = null, config = {}) {
        return this.request({ ...config, method: 'PUT', url, data });
    }

    /**
     * DELETE request
     * @param {string} url - Endpoint URL
     * @param {Object} config - Additional configuration
     * @returns {Promise<ApiResponse>}
     */
    async delete(url, config = {}) {
        return this.request({ ...config, method: 'DELETE', url });
    }
}

export const apiClient = ApiClient.getInstance();