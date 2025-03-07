import { z } from "zod";

export const MAX_TEXT_LENGTH = 600;

const FieldTypes = [
  "text",
  "number",
  "options",
  "checkbox",
  "checkbox group",
  "email",
  "url",
  "divide",
  "title",
  "paragraph",
] as const;

const baseSchema = z.object({
  id: z.string(),
  type: z.enum(FieldTypes),
});

const baseFieldSchema = baseSchema.extend({
  showDescription: z.boolean(),
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
});

export const paragraphSchema = baseSchema.extend({
  type: z.literal("text"),
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
  type: z.literal("checkbox group"),
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

export const surveySchema = z
  .array(
    z.discriminatedUnion("type", [
      textSchema,
      emailSchema,
      urlSchema,
      numberSchema,
      checkboxSchema,
      checkboxGroupSchema,
      optionsSchema,
      divideSchema,
      paragraphSchema,
      titleSchema,
    ]),
  )
  .min(1, { message: "At least 1 field is required" })
  .refine(
    (data) => {
      const labels = data
        .filter((item) => Object.hasOwn(item, "label"))
        // @ts-expect-error filtered out without label
        .map((item) => item.label);
      const uniqueLabels = new Set(labels);
      return uniqueLabels.size === labels.length;
    },
    {
      message: "Labels must be unique",
      path: [],
    },
  );

export const createSurveyScema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  survey: surveySchema,
});

export type FieldType = (typeof FieldTypes)[number];
export type SurveySchema = z.infer<typeof surveySchema>;
export type SurveySchemaField = SurveySchema[number];
