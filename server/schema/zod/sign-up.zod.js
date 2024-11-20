import z from 'zod';
import User from '../../models/user.model.js';

// Validation function for email uniqueness
const isEmailUnique = async (email) => {
    const existingUser = await User.findOne({ "personal_info.email": email });
    return !existingUser;
};

// Validation function for username uniqueness
const isUsernameUnique = async (username) => {
    const existingUser = await User.findOne({ "personal_info.username": username });
    return !existingUser;
};

// Main sign-up schema
const signUpSchema = z
    .object({
        email: z
            .string({ message: 'Email must be a string' })
            .email({ message: 'Invalid email address' })
            .min(1, { message: 'Email is required' })
            .refine(isEmailUnique, { message: 'Email is already taken' }),

        username: z
            .string({ message: 'Username must be a string' })
            .min(3, { message: 'Username must be at least 3 characters' })
            .max(30, { message: 'Username must not exceed 30 characters' })
            .regex(/^[a-zA-Z0-9_-]+$/, {
                message: 'Username can only contain letters, numbers, underscores, and hyphens',
            })
            .refine(isUsernameUnique, { message: 'Username is already taken' })
            .optional(), // Make optional for conditional validation

        fullname: z
            .string({ message: 'Full name must be a string' })
            .min(2, { message: 'Full name must be at least 2 characters' })
            .max(50, { message: 'Full name must not exceed 50 characters' })
            .optional(), // Make optional for conditional validation

        password: z
            .string({ message: 'Password must be a string' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            }),

        authMethod: z.enum(['password', 'google', 'github'], { message: 'Invalid authentication method' }),
    })
    .superRefine((data, ctx) => {
        if (data.authMethod === 'google') {
            if (!data.password) {
                ctx.addIssue({
                    path: ['password'],
                    message: 'Password is required for Google authentication',
                });
            }
            // Ignore other fields for Google authentication
            ['username', 'fullname'].forEach((field) => {
                if (data[field]) {
                    ctx.addIssue({
                        path: [field],
                        message: `${field} should not be provided for Google authentication`,
                    });
                }
            });
        } else {
            // Ensure required fields for non-Google methods
            ['username', 'fullname'].forEach((field) => {
                if (!data[field]) {
                    ctx.addIssue({
                        path: [field],
                        message: `${field} is required`,
                    });
                }
            });
        }
    });

export default signUpSchema;