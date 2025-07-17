import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().min(1, 'Email is required')
        .email('Must be a valid email'),
    password: z.string().min(1, 'Password is required')
        .min(6, 'Min. 6 characters')
});

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required')
        .email('Must be a valid email'),
    password: z.string().min(1, 'Password is required')
        .min(6, 'Min. 6 characters')
});