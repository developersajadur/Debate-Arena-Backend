import { z } from 'zod';

const castVoteZodSchema = z.object({
  body: z.object({
    argumentId: z.string().min(1, 'Argument ID is required'),
  }),
});

export const voteValidationSchema = {
  castVoteZodSchema,
};
