import admin from '../config/firebase.config.js';
import User from '../models/user.model.js';
import JwtService from './jwt.service.js';
import AvatarService from './avatar.service.js';
import BcryptUtil from '../utils/bcrypt.util.js';
import mailService from './email.service.js';

import ApiResponse from '../utils/api-response.util.js';
import { getAuth } from 'firebase-admin/auth';

class AuthService {
    constructor() {
        this.jwtService = JwtService;
        this.avatarService = AvatarService;
    }

    /**
     * Verify and decode token based on authentication method
     * @param {string} token - Authentication token
     * @returns {Promise<Object>} Decoded user information
     */
    async verifyToken(token) {
        try {
            if (!admin.apps.length) {
                throw new Error('Firebase Admin must be initialized');
            }
            const decodedGoogleToken = await getAuth().verifyIdToken(token);
            return {
                method: 'google',
                googleId: decodedGoogleToken.uid,
                fullname: decodedGoogleToken.name || decodedGoogleToken.displayName, // Add displayName as fallback
                email: decodedGoogleToken.email,
                avatar: decodedGoogleToken.picture
            };
        } catch (error) {
            console.error('Token verification error:', error);
            throw new Error(`Token verification failed: ${error.message}`);
        }
    }

    /**
     * Signup method to handle different authentication methods
     * @param {Object} signupData - Signup information
     * @returns {Promise<Object>} User and authentication tokens
     */
    async signup(signupData) {
        const {
            email,
            username,
            fullname,
            password,
            avatar,
            authMethod = 'password',
            response,
        } = signupData;

        // Check if user already exists
        const existingUser = await User.findOne({
            'personal_info.email': email
        });


        // If user exists with different auth method, throw an error
        if (existingUser && existingUser.account_info.auth_type !== authMethod) {
            return response.status(403).json(new ApiResponse({
                status: false,
                message: `Account already exists with ${existingUser.account_info.auth_type} authentication`,
                data: null,
            }));
        }

        let userData = {
            personal_info: {
                fullname,
                email,
                username: username,
                avatar: authMethod != 'google' ? avatar ? avatar : this.generateAvatar(fullname) : null
            },
            account_info: {
                auth_type: authMethod,
                isEmailVerified: false,
                isVerified: false
            }
        }

        if (authMethod == 'password') {
            // For password, hash the password and generate verification token
            userData.account_info.password = await BcryptUtil.hashPassword(password);
            userData.account_info.verificationToken = mailService.generateToken();
        } else if (authMethod == 'google') {
            // For Google, verify the ID token
            const googleUserInfo = await this.verifyToken(password);

            userData.personal_info.fullname = googleUserInfo.fullname;
            userData.personal_info.username = await this.generateUsername(googleUserInfo.email);
            userData.personal_info.email = googleUserInfo.email;
            userData.personal_info.avatar = googleUserInfo.avatar || this.generateAvatar(googleUserInfo.name);
            userData.account_info.google_id = googleUserInfo.googleId;
            userData.account_info.isEmailVerified = true;
            userData.account_info.password = null;
        }

        let user = new User(userData);

        // Save user to database
        await user.save();

        // Generate tokens if applicable
        const tokens = this.jwtService.generateTokens(user);

        // Send verification email for password method
        if (authMethod === 'password' && !user.account_info.isEmailVerified) {
            const verificationUrl = mailService.generateEmailVerificationLink(user.account_info.verificationToken);
            await this.sendVerificationEmail(email, verificationUrl);

            return response.status(201).json(new ApiResponse({
                status: true,
                message: 'Account created successfully. Check your email to verify your account',
                data: null,
            }));
        }

        let data = null;
        if (authMethod === 'google') {
            // Prepare response
            data = {
                user: {
                    id: user._id,
                    username: user.personal_info.username,
                    email: user.personal_info.email,
                    avatar: user.personal_info.avatar
                },
                ...tokens
            };
        } else if (authMethod === 'password') {
            data = null;
        }

        return response.status(201).json(new ApiResponse({
            status: true,
            message: 'Account created successfully',
            data
        }));
    }

    /**
     * Login method to handle different authentication methods
     * @param {Object} loginData - Login information
     * @returns {Promise<Object>} User and authentication tokens
     */
    async login(loginData) {
        const {
            email,
            password,
            authMethod = 'password',
            idToken, // Add idToken parameter for Google auth
            response
        } = loginData;

        // Find user by email
        const user = await User.findOne({
            'personal_info.email': email
        });

        // Check if user exists
        if (!user) {
            return response.status(404).json(new ApiResponse({
                status: false,
                message: 'Invalid email or password',
                data: null,
            }));
        }

        // Validate authentication method
        if (user.account_info.auth_type !== authMethod) {
            return response.status(403).json(new ApiResponse({
                status: false,
                message: `Please login with ${user.account_info.auth_type}`,
                data: null,
            }));
        }

        if (authMethod === 'password') {
            // Check if email is verified
            if (!user.account_info.isEmailVerified) {
                // Regenerate verification token and send email
                const verificationToken = mailService.generateToken();
                const verificationUrl = mailService.generateEmailVerificationLink(verificationToken);

                user.account_info.verificationToken = verificationToken;
                await user.save();

                await this.sendVerificationEmail(email, verificationUrl);

                return response.status(403).json(new ApiResponse({
                    status: false,
                    message: 'Email not verified, check your email to verify your account',
                    data: null,
                }));
            }

            // Verify password
            const isPasswordMatch = await BcryptUtil.comparePassword(
                password,
                user.account_info.password
            );

            if (!isPasswordMatch) {
                return response.status(404).json(new ApiResponse({
                    status: false,
                    message: 'Invalid email or password',
                    data: null,
                }));
            }
        } else if (authMethod === 'google') {
            // Check if idToken is provided
            if (!idToken) {
                return response.status(400).json(new ApiResponse({
                    status: false,
                    message: 'Google ID token is required',
                    data: null,
                }));
            }

            // For Google, verify the ID token
            try {
                const googleUserInfo = await this.verifyToken(idToken);

                // Verify that the Google email matches the stored email
                if (googleUserInfo.email !== email) {
                    return response.status(403).json(new ApiResponse({
                        status: false,
                        message: 'Google authentication failed: Email mismatch',
                        data: null,
                    }));
                }
            } catch (error) {
                console.error('Google auth error:', error);
                return response.status(403).json(new ApiResponse({
                    status: false,
                    message: 'Invalid Google authentication',
                    data: null,
                }));
            }
        }

        // Generate tokens
        const tokens = this.jwtService.generateTokens(user);

        // Prepare response
        const data = {
            user: {
                id: user._id,
                username: user.personal_info.username,
                email: user.personal_info.email,
                avatar: user.personal_info.avatar
            },
            ...tokens
        };

        return response.status(200).json(new ApiResponse({
            status: true,
            message: 'Login successful',
            data
        }));
    }

    /**
     * Generate a unique username
     * @param {string} email - User's email
     * @param {string} authMethod - Authentication method
     * @returns {string} Generated username
     */
    async generateUsername(email) {
        // Clean the base username according to constraints
        const baseUsername = email.split('@')[0]
            // Allow letters (both cases), numbers, underscores, and hyphens
            .replace(/[^a-zA-Z0-9_-]/g, '')
            // Ensure it starts with a letter (if it doesn't, prepend 'user')
            .replace(/^[^a-zA-Z]+/, '');
    
        // If base username is too short, pad it with 'user'
        const paddedBaseUsername = baseUsername.length < 3 ? `user${baseUsername}` : baseUsername;
        
        // Truncate if longer than 30 characters
        const validBaseUsername = paddedBaseUsername.slice(0, 30);
    
        if (await this.isUsernameAvailable(validBaseUsername)) {
            return validBaseUsername;
        }
    
        // List of adjectives that won't make username exceed 30 chars
        const adjectives = [
            'Cool', 'Pro', 'Dev', 'Ace', 'Top',
            'Star', 'Best', 'Good', 'Super', 'Mega'
        ];
    
        // Try adding adjectives while respecting max length
        for (const adjective of adjectives) {
            const usernameWithAdjective = `${adjective}_${validBaseUsername}`;
            if (usernameWithAdjective.length <= 30 && 
                await this.isUsernameAvailable(usernameWithAdjective)) {
                return usernameWithAdjective;
            }
        }
    
        // Try adding numbers while respecting max length
        let attempts = 0;
        const maxAttempts = 100;
    
        while (attempts < maxAttempts) {
            const randomNum = Math.floor(Math.random() * 1000);
            const usernameWithNumber = `${validBaseUsername}_${randomNum}`;
            
            if (usernameWithNumber.length <= 30 && 
                await this.isUsernameAvailable(usernameWithNumber)) {
                return usernameWithNumber;
            }
    
            attempts++;
        }
    
        // Final fallback: use timestamp
        const timestamp = Date.now().toString().slice(-4);
        const finalUsername = `${validBaseUsername}_${timestamp}`;
        
        // Ensure final result doesn't exceed 30 characters
        return finalUsername.slice(0, 30);
    }

    async isUsernameAvailable(username) {
        // Example using a database
        try {
            const existingUser = await User.findOne({ 'personal_info.username': username });

            if (existingUser) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            throw new Error('Failed to check username availability');
        }
    }

    /**
     * Generate avatar
     * @param {string} fullname - User's full name
     * @returns {string} Avatar URL
     */
    generateAvatar(fullname) {
        return this.avatarService.generateAvatar({
            seed: fullname,
            size: 128,
            backgroundColor: this.avatarService.generateRandomColor(),
            radius: 50,
        });
    }

    /**
     * Send verification email
     * @param {string} email - Recipient email
     * @param {string} verificationUrl - Verification URL
     */
    async sendVerificationEmail(email, verificationUrl) {
        await mailService.sendEmail({
            to: email,
            subject: 'Verify your email address',
            text: `Click the link below to verify your email address: ${verificationUrl}`,
            html: `
                <h1>Verify your email address</h1>
                <p>Click the link below to verify your email address</p>
                <a href="${verificationUrl}">Verify email address</a>
            `
        });
    }
}

export default new AuthService();