import z from 'zod';

// Main verify-email schema
const verifyEmailSchema = z.object({
    token: z.string({ message: 'Token must be a string' }).min(1, { message: 'Token is required' }),
});

export default verifyEmailSchema;