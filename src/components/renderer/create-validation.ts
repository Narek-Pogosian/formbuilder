import type { FormSchema, FormSchemaField } from "@/lib/schemas/form-schemas";
import { z, type ZodTypeAny } from "zod";

function applyCommonStringRules(
  schema: z.ZodString,
  required: boolean,
): ZodTypeAny {
  schema = schema.max(600, { message: "Must be at most 600 characters" });
  return required
    ? schema.min(1, { message: "This field is required" })
    : schema.optional().or(z.literal(""));
}

function createFieldSchema(field: FormSchemaField): ZodTypeAny {
  switch (field.type) {
    case "text":
      return applyCommonStringRules(z.string().trim(), field.required);

    case "email":
      return applyCommonStringRules(z.string().trim().email(), field.required);

    case "url":
      const urlRegex =
        /\b(?:https?|ftp):\/\/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?|\b(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?\b/;
      return applyCommonStringRules(
        z.string().trim().regex(urlRegex, "Invalid URL"),
        field.required,
      );

    case "options":
      const optionsSchema = z
        .string()
        .refine((val) => field.options.some((o) => o.value === val), {
          message: "Invalid option",
        });
      return field.required ? optionsSchema : optionsSchema.optional();

    case "number":
      let numberSchema = z.coerce.number({ message: "Must be a number" });
      if (typeof field.min === "number") {
        numberSchema = numberSchema.min(field.min, {
          message: `Must be at least ${field.min}`,
        });
      }

      if (typeof field.max === "number") {
        numberSchema = numberSchema.max(field.max, {
          message: `Must be at most ${field.max}`,
        });
      }

      return field.required
        ? numberSchema.refine((val) => !isNaN(val), {
            message: "This field is required and must be a valid number",
          })
        : z
            .literal("")
            .transform(() => undefined)
            .or(numberSchema.optional());

    case "checkbox":
      const checkboxSchema = z.boolean();
      return field.required
        ? checkboxSchema.refine((val) => val, {
            message: "This field is required",
          })
        : checkboxSchema.optional();

    default:
      throw new Error("Unsupported field type");
  }
}

export function createValidationSchema(form: FormSchema) {
  const shape: Record<string, ZodTypeAny> = {};

  form
    .filter((f) => f.saved)
    .forEach((field) => {
      shape[field.id] = createFieldSchema(field);
    });

  return z.object(shape);
}
