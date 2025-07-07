import { CircleCheckBig, Sigma, Type, type LucideIcon } from "lucide-react";
import type { FieldType, FormSchemaField } from "@/lib/schemas/form.schema";
import type { UseFormReturn } from "react-hook-form";
import RenderTextField from "./render-fields/text-field";
import RenderNumberField from "./render-fields/number-field";
import RenderCheckboxField from "./render-fields/checkbox-field";

type FieldsList = Record<
  FieldType,
  Readonly<{
    label: string;
    icon: LucideIcon;
    RenderField: React.ComponentType<RenderFieldProps>;
    // CreateForm: React.ComponentType<CreateFormProps>;
  }>
>;

export const Fields: FieldsList = {
  text: {
    label: "Text",
    icon: Type,
    RenderField: RenderTextField,
  },
  number: {
    label: "Number",
    icon: Sigma,
    RenderField: RenderNumberField,
  },
  checkbox: {
    label: "Checkbox",
    icon: CircleCheckBig,
    RenderField: RenderCheckboxField,
  },
} as const;

// ----- Types ------

export type CreateFormProps = {
  submitHandler: (data: FormSchemaField) => void;
  defaultField?: FormSchemaField;
};

export type RenderFieldProps = {
  form: UseFormReturn;
  formField: FormSchemaField;
};

export type BuilderFieldProps = {
  field: FormSchemaField;
};
