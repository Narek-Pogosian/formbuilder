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

    case "email":
      return {
        ...base,
        type: "email",
        placeholder: "",
      };

    case "url":
      return {
        ...base,
        type: "url",
        placeholder: "",
      };

    case "options":
      return {
        ...base,
        type: "options",
        multiAnswer: false,
        options: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
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
