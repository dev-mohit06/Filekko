import z from 'zod';

const resendVerificationEmailSchema = z.object({
    token: z.string({ message: 'Token must be a string' }).min(1, { message: 'Token is required' }),
});

export default resendVerificationEmailSchema;