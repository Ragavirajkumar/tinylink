import { z } from "zod";

export const createLinkSchema = z.object({
  url: z
    .string()
    .url("Enter a valid URL")
    .refine(
      (v) => v.startsWith("http://") || v.startsWith("https://"),
      "URL must start with http:// or https://"
    ),

  code: z
    .string()
    .min(6, "Code must be at least 6 characters")
    .max(12, "Code too long")
    .regex(/^[a-zA-Z0-9]+$/, "Use only letters & numbers")
    .optional()
    .or(z.literal("")),
});
