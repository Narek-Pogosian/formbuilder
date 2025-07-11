import type { FieldType, FormSchemaField } from "@/lib/schemas/form-schemas";

export function getDefaultField(type: FieldType): FormSchemaField {
  const base = {
    id: crypto.randomUUID(),
    label: "",
    required: false,
    description: "",
    showDescription: false,
    editing: true,
    saved: false,
    followUps: undefined,
  };

  switch (type) {
    case "text":
      return {
        ...base,
        type: "text",
        longAnswer: false,
        placeholder: "",
      };

    case "number":
      return {
        ...base,
        type: "number",
        min: "",
        max: "",
      };

    case "checkbox":
      return {
        ...base,
        type: "checkbox",
      };

    default:
      throw new Error("Unknown field type");
  }
}
