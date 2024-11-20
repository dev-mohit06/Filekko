// Utilities for handling authentication requests
import asyncHandler from '../utils/async-handler.util.js';
import ApiResponse from '../utils/api-response.util.js';

// Services for handling authentication requests
import fileUploadService from '../services/file-upload.service.js';
import jwtService from '../services/jwt.service.js'
import AuthService from '../services/auth.service.js';

// Models
import User from '../models/user.model.js';

export const singUp = asyncHandler(async (req, res, next) => {
    const { email, username, fullname, password, authMethod } = req.body;

    // Handle file upload if exists
    let avatar = req.file
        ? fileUploadService.getUploadedAvatarUrl(req)
        : null;


    if (authMethod === 'password') {
        const authResult = await AuthService.signup({
            email,
            username,
            fullname,
            password,
            avatar,
            authMethod: 'password',
            response: res
        });

        return res.status(201).json(new ApiResponse({
            status: true,
            message: 'Account created successfully. Check your email to verify your account',
            data: authResult,
        }));

    } else if (authMethod === 'google') {

        const { password } = req.body;

        const authResult = await AuthService.signup({
            email: null, // Will be extracted from Google token
            username: null, // Will be generated
            fullname: null, // Will be extracted from Google token
            password: password, // Pass ID token for verification
            avatar: null, // Will be extracted from Google token
            authMethod: 'google',
            response: res
        });

        return res.status(201).json(new ApiResponse({
            status: true,
            message: 'Account created successfully',
            data: authResult,
        }));
    } else {
        return res.status(400).json(new ApiResponse({
            status: false,
            message: 'Invalid authentication method',
            data: null,
        }));
    }
});

export const login = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { email, password, authMethod } = req.body;

    if (authMethod === 'password') {
        const authResult = await AuthService.login({
            email,
            password,
            authMethod: 'password',
            response: res
        });

        return res.status(200).json(new ApiResponse({
            status: true,
            message: 'Login successful',
            data: authResult,
        }));

    } else if (authMethod === 'google') {
        const { password: idToken } = req.body;

        const authResult = await AuthService.login({
            email,
            idToken,
            authMethod: 'google',
            response: res
        });
    } else {
        return res.status(400).json(new ApiResponse({
            status: false,
            message: 'Invalid authentication method',
            data: null,
        }));
    }
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.body;

    const user = await User.findOne({ 'account_info.verificationToken': token });

    if (!user) {
        return res.status(404).json(new ApiResponse({
            status: false,
            message: 'Invalid verification token',
            data: null,
        }));
    }

    user.account_info.verificationToken = null;
    user.account_info.isEmailVerified = true;

    await user.save();

    const tokens = jwtService.generateTokens(user);

    return res.status(200).json(new ApiResponse({
        status: true,
        message: 'Email verified successfully',
        data: {
            ...tokens,
        },
    }));
});