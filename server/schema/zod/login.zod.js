import z from 'zod';

// Main verify-email schema
const loginSchema = z.object({
    email : z
        .string({ message: 'Email is required' })
        .email({ message: 'Invalid email' }),
    password: z
        .string({ message: 'Password must be a string' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        }),
    authMethod: z.enum(['password','google','github'], { message: 'Invalid authentication method' }),
});

export default loginSchema;