import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JwtService {
    constructor() {
        this.secretKey = process.env.JWT_SECRET;
        this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
        this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
    }

    /**
    * Generate access token for a user
    * @param {Object} payload - User data to encode in token
    * @returns {string} Access token
    */
    generateAccessToken(payload) {
        return jwt.sign(payload, this.secretKey, {
            expiresIn: this.accessTokenExpiry
        });
    }

    /**
    * Generate refresh token
    * @param {Object} payload - User data to encode in token
    * @returns {string} Refresh token
    */
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.secretKey, {
            expiresIn: this.refreshTokenExpiry
        });
    }

    /**
    * Generate both access and refresh tokens
    * @param {Object} user - User object
    * @returns {Object} Object containing both tokens
    */
    generateTokens(user) {
        const payload = {user};

        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload)
        };
    }

    /**
    * Verify and decode a token
    * @param {string} token - JWT token to verify
    * @returns {Object} Decoded token payload
    */
    verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    /**
   * Refresh access token using refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Object} New access token
   */
    refreshAccessToken(refreshToken) {
        const decoded = this.verifyToken(refreshToken);
        const accessToken = this.generateAccessToken(decoded.user);

        return { accessToken };
    }
}

export default new JwtService();