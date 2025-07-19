import z from 'zod';

const registerUser = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    number: z.string().min(10, 'Number must be at least 10 characters'),
  }),
});

export const userValidationSchema = {
  registerUser,
};
