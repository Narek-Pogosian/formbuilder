import { z } from "zod";

const baseFieldSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1, { message: "Required" }),
  required: z.boolean(),
  showDescription: z.boolean(),
  description: z.string().trim(),
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
  placeholder: z.string(),
});

export const emailSchema = baseFieldSchema.extend({
  type: z.literal("email"),
  placeholder: z.string(),
});

export const urlSchema = baseFieldSchema.extend({
  type: z.literal("url"),
  placeholder: z.string(),
});

export const optionsSchema = baseFieldSchema.extend({
  type: z.literal("options"),
  multiAnswer: z.boolean().default(false),
  options: z
    .array(
      z.object({
        value: z.string().trim().min(1, { message: "Required" }),
      }),
    )
    .min(1),
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
    z.discriminatedUnion("type", [
      textSchema,
      emailSchema,
      urlSchema,
      optionsSchema,
      numberSchema,
      checkboxSchema,
    ]),
  )
  .min(1, { message: "At least 1 field is required" });

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaField = FormSchema[number];
export type FieldType = FormSchema[number]["type"];
