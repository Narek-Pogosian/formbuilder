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
  .min(1, { message: "At least 1 field is required" });

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaField = FormSchema[number];
