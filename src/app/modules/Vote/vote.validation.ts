import z from "zod";

const createVoteZodValidation = z.object({
  user: z.string().min(1, "User ID is required"),
  argument: z.string().min(1, "Argument ID is required"),
});

export const voteValidationSchema = {
  createVoteZodValidation,
};
