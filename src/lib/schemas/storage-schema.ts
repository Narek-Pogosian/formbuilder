import z from "zod";
import { formSchema } from "./form-schemas";

const settingsSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const storageSchema = z.object({
  fields: formSchema,
  settings: settingsSchema,
});
