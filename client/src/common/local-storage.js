/**
 * @typedef {Object} ApiResponse
 * @property {boolean} status - Success status
 * @property {string} message - Response message
 * @property {any} data - Response data (can be null)
 */

/**
 * @typedef {Object} UserData
 * @property {string} id - User's unique identifier
 * @property {string} email - User's email
 * @property {string} name - User's name
 * @property {string} [avatar] - Optional avatar URL
 * @property {boolean} isEmailVerified - Email verification status
 */

// Storage keys as constants
const STORAGE_KEYS = {
    AUTH_STATE: 'auth_state',
    TOKEN: 'auth_token',
};

class LocalStorageService {
    static #instance = null;

    constructor() {
        if (LocalStorageService.#instance) {
            return LocalStorageService.#instance;
        }
        LocalStorageService.#instance = this;
    }

    /**
     * Get the singleton instance
     * @returns {LocalStorageService}
     */
    static getInstance() {
        if (!LocalStorageService.#instance) {
            LocalStorageService.#instance = new LocalStorageService();
        }
        return LocalStorageService.#instance;
    }

    /**
     * Save authentication state to localStorage
     * @param {Object} authState - The authentication state to save
     */
    saveAuthState(authState) {
        try {
            const serializedState = JSON.stringify(authState);
            localStorage.setItem(STORAGE_KEYS.AUTH_STATE, serializedState);

            // Also save token separately for easy access
            if (authState.token) {
                localStorage.setItem(STORAGE_KEYS.TOKEN, authState.token);
            }
        } catch (error) {
            console.error('Error saving auth state:', error);
            this.clearAuth();
        }
    }

    /**
     * Get the complete authentication state
     * @returns {Object|null}
     */
    getAuthState() {
        try {
            const serializedState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
            if (!serializedState) return null;
            return JSON.parse(serializedState);
        } catch (error) {
            console.error('Error reading auth state:', error);
            this.clearAuth();
            return null;
        }
    }

    /**
     * Get the authentication token
     * @returns {string|null}
     */
    getToken() {
        try {
            return localStorage.getItem(STORAGE_KEYS.TOKEN);
        } catch (error) {
            console.error('Error reading token:', error);
            return null;
        }
    }

    /**
     * Get user data
     * @returns {UserData|null}
     */
    getUserData() {
        const authState = this.getAuthState();
        return authState?.user ?? null;
    }

    /**
     * Clear all authentication data
     */
    clearAuth() {
        try {
            localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return Boolean(this.getToken());
    }
}

export const localStorageService = LocalStorageService.getInstance();