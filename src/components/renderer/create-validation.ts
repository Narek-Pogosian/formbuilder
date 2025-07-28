import type { FormSchema, FormSchemaField } from "@/lib/schemas/form-schemas";
import { z, type ZodTypeAny } from "zod";

const REQUIRED_MESSAGE = "This field is required";

function applyStringRules(schema: z.ZodString, required: boolean): ZodTypeAny {
  schema = schema.max(600, { message: "Must be at most 600 characters" });
  return required
    ? schema.min(1, { message: REQUIRED_MESSAGE })
    : schema.optional().or(z.literal(""));
}

function createOptionsSchema(field: FormSchemaField): ZodTypeAny {
  if (field.type !== "options") throw "Not options field";

  if (field.multiAnswer) {
    const schema = field.required
      ? z.array(z.string()).min(1, { message: "Pick at least 1 option" })
      : z.array(z.string());

    return schema.refine((res) =>
      res.every((val) => field.options.map((f) => f.value).includes(val)),
    );
  } else {
    const schema = field.required
      ? z
          .string({ message: REQUIRED_MESSAGE })
          .refine((val) => field.options.some((o) => o.value === val), {
            message: "Invalid option",
          })
      : z.string().optional();

    return schema;
  }
}

function createNumberSchema(field: FormSchemaField): ZodTypeAny {
  if (field.type !== "number") throw "Not number field";

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

  return numberSchema;
}

function createFieldSchema(field: FormSchemaField): ZodTypeAny {
  switch (field.type) {
    case "text": {
      return applyStringRules(z.string().trim(), field.required);
    }

    case "email": {
      return applyStringRules(z.string().trim().email(), field.required);
    }

    case "url": {
      return applyStringRules(z.string().trim().url(), field.required);
    }

    case "options": {
      return createOptionsSchema(field);
    }

    case "number": {
      const numberSchema = createNumberSchema(field);
      return field.required
        ? numberSchema.refine((val) => !isNaN(val), {
            message: "This field is required and must be a valid number",
          })
        : z
            .literal("")
            .transform(() => undefined)
            .or(numberSchema.optional());
    }

    case "checkbox": {
      const checkboxSchema = z.boolean();
      return field.required
        ? checkboxSchema.refine((val) => val, {
            message: REQUIRED_MESSAGE,
          })
        : checkboxSchema.optional();
    }

    default:
      throw new Error("Unsupported field type");
  }
}

function getDefaultValue(field: FormSchemaField) {
  switch (field.type) {
    case "options":
      if (field.multiAnswer) return [];
      return;
    case "checkbox":
      return false;
    default:
      return "";
  }
}

export function createValidationSchema(form: FormSchema) {
  const shape: Record<string, ZodTypeAny> = {};
  const defaultValues: Record<string, any> = {};

  form
    .filter((f) => f.saved)
    .forEach((field) => {
      defaultValues[field.id] = getDefaultValue(field);
      shape[field.id] = createFieldSchema(field);
    });

  return { schema: z.object(shape), defaultValues };
}
