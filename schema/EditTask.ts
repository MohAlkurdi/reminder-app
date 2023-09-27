import { z } from "zod";

export const editTaskSchema = z.object({
  content: z.string().min(8, {
    message: "Task content must be at least 8 characters",
  }),
  expiresAt: z.date().optional(),
});

export type editTaskSchemaType = z.infer<typeof editTaskSchema>;
