import z from 'zod';

const createArgumentZodValidation = z.object({
  body: z.object({
    debate: z.string().min(1, 'Debate ID is required'),
    content: z.string().min(1, 'Content cannot be empty'),
  }),
});

const updateArgumentZodValidation = z.object({
  body: z.object({
    content: z.string().min(1, 'Updated content is required'),
  }),
});

export const argumentValidationSchema = {
  createArgumentZodValidation,
  updateArgumentZodValidation,
};
