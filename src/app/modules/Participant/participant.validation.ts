import z from "zod";

const createParticipantZodValidation = z.object({
  user: z.string().min(1, "User ID is required"),
  debate: z.string().min(1, "Debate ID is required"),
  side: z.enum(["support", "oppose"], "Side must be either 'support' or 'oppose'"),
});

export const participantValidationSchema = {
  createParticipantZodValidation,
};
