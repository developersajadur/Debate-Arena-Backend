import z from "zod/v3";


const registerUser = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    number: z
      .string()
      .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
    password: z.string().min(6),
  }),
});

export const userValidationSchema = {
  registerUser,
};
