import z from 'zod';

const createParticipantZodValidation = z.object({
  body: z.object({
    debate: z.string().min(1, 'Debate ID is required'),
    side: z.enum(
      ['support', 'oppose'],
      "Side must be either 'support' or 'oppose'",
    ),
  }),
});

export const participantValidationSchema = {
  createParticipantZodValidation,
};
