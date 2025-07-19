import z from "zod";


const createDebateZodValidation = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).nonempty("Tags cannot be empty"),
  category: z.string().min(1, "Category is required"),
  bannerUrl: z.string().url("Invalid URL").optional(),
  duration: z.number().positive("Duration must be a positive number"),
  createdBy: z.string().min(1, "CreatedBy is required"),
  status: z.enum(["open", "closed"]).optional(),
});

export const debateValidationSchema = {
  createDebateZodValidation,
};