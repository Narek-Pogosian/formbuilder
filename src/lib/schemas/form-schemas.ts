import { z } from "zod";

const baseFieldSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1, { message: "A label is required" }),
  required: z.boolean(),
  showDescription: z.boolean(),
  description: z.string().optional(),
  editing: z.boolean(),
  saved: z.boolean(),
  followUps: z
    .object({
      parentId: z.string(),
      valueToMatch: z.any(),
    })
    .optional(),
});

export const textSchema = baseFieldSchema.extend({
  type: z.literal("text"),
  longAnswer: z.boolean(),
  placeholder: z.string().optional(),
});

export const numberSchema = baseFieldSchema.extend({
  type: z.literal("number"),
  min: z.union([z.literal(""), z.coerce.number().optional()]),
  max: z.union([z.literal(""), z.coerce.number().optional()]),
});

export const checkboxSchema = baseFieldSchema.extend({
  type: z.literal("checkbox"),
});

export const formSchema = z
  .array(
    z.discriminatedUnion("type", [textSchema, numberSchema, checkboxSchema]),
  )
  .min(1, { message: "At least 1 field is required" });

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaField = FormSchema[number];
export type FieldType = FormSchema[number]["type"];
