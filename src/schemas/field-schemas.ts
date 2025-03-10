import { z } from "zod";

const FieldTypes = [
  "text",
  "number",
  "options",
  "checkbox",
  "checkboxGroup",
  "email",
  "url",
  "divide",
  "title",
  "paragraph",
] as const;

const baseSchema = z.object({
  id: z.string(),
  type: z.enum(FieldTypes),
  isFieldSchema: z.literal(false),
});

const baseFieldSchema = baseSchema.extend({
  showDescription: z.boolean(),
  isFieldSchema: z.literal(true),
  description: z.string().optional(),
  required: z.boolean(),
  label: z
    .string()
    .trim()
    .min(1, { message: "A label is required for every field" }),
});

export const divideSchema = baseSchema.extend({
  type: z.literal("divide"),
});

export const titleSchema = baseSchema.extend({
  type: z.literal("title"),
  text: z.string().min(1, { message: "Text is required" }),
});

export const paragraphSchema = baseSchema.extend({
  type: z.literal("paragraph"),
  text: z.string().min(1, { message: "Text is required" }),
});

export const textSchema = baseFieldSchema.extend({
  type: z.literal("text"),
  longAnswer: z.boolean(),
  placeholder: z
    .string()
    .trim()
    .min(1, { message: "A placeholder is required" }),
});

export const numberSchema = baseFieldSchema.extend({
  type: z.literal("number"),
  min: z.literal("").or(z.coerce.number().optional()),
  max: z.literal("").or(z.coerce.number().optional()),
});

export const emailSchema = baseFieldSchema.extend({
  type: z.literal("email"),
  placeholder: z.string().trim().optional(),
});

export const urlSchema = baseFieldSchema.extend({
  type: z.literal("url"),
  placeholder: z.string().trim().optional(),
});

export const checkboxSchema = baseFieldSchema.extend({
  type: z.literal("checkbox"),
});

export const checkboxGroupSchema = baseFieldSchema.extend({
  type: z.literal("checkboxGroup"),
  options: z.array(
    z.object({
      label: z.string().trim().min(1, { message: "A label is required" }),
    }),
  ),
});

export const optionsSchema = baseFieldSchema.extend({
  type: z.literal("options"),
  options: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(1, { message: "An option label is required" }),
      }),
    )
    .min(1),
});

export type FieldType = (typeof FieldTypes)[number];
