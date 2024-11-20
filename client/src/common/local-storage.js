class LocalStorage {
    static TOKEN_KEY = 'auth_tokens';
    static USER_KEY = 'user_info';

    static setTokens(tokens) {
        try {
            localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
        } catch (error) {
            console.error('Error saving tokens:', error);
            throw error;
        }
    }

    static setUser(user) {
        try {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    static getTokens() {
        try {
            const tokens = localStorage.getItem(this.TOKEN_KEY);
            return tokens ? JSON.parse(tokens) : null;
        } catch (error) {
            console.error('Error reading tokens:', error);
            return null;
        }
    }

    static getUser() {
        try {
            const user = localStorage.getItem(this.USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error reading user:', error);
            return null;
        }
    }

    static getAccessToken() {
        const tokens = this.getTokens();
        return tokens?.accessToken || null;
    }

    static getRefreshToken() {
        const tokens = this.getTokens();
        return tokens?.refreshToken || null;
    }

    static isAuthenticated() {
        return !!this.getAccessToken();
    }

    static handleLoginSuccess(response) {
        try {
            const { accessToken, refreshToken, user } = response.data;
            this.setTokens({ accessToken, refreshToken });
            this.setUser(user);
        } catch (error) {
            console.error('Error handling login:', error);
            throw error;
        }
    }

    static clearAuth() {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
        } catch (error) {
            console.error('Error clearing auth:', error);
            throw error;
        }
    }
}

export default LocalStorage;