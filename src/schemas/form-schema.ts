import { z } from "zod";
import {
  checkboxGroupSchema,
  checkboxSchema,
  divideSchema,
  emailSchema,
  numberSchema,
  optionsSchema,
  paragraphSchema,
  textSchema,
  titleSchema,
  urlSchema,
} from "./field-schemas";

export const formSchema = z
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
        .filter((item) => item.isFieldType)
        .map((item) => item.label);

      const uniqueLabels = new Set(labels);
      return uniqueLabels.size === labels.length;
    },
    {
      message: "Labels must be unique",
      path: [],
    },
  );

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaField = FormSchema[number];
