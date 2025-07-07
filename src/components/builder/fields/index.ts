import { CircleCheckBig, Sigma, Type, type LucideIcon } from "lucide-react";
import type { FieldType, FormSchemaField } from "@/lib/schemas/form-schemas";
import type { UseFormReturn } from "react-hook-form";
import RenderTextField from "./render-fields/text-field";
import RenderNumberField from "./render-fields/number-field";
import RenderCheckboxField from "./render-fields/checkbox-field";
import TextCreateForm from "./edit-forms/text-form";
import BuilderTextField from "./builder-fields/text-field";
import BuilderNumberField from "./builder-fields/number-field";
import BuilderCheckboxField from "./builder-fields/checkbox-field";

type Fields = Record<
  FieldType,
  Readonly<{
    label: string;
    icon: LucideIcon;
    RenderField: React.ComponentType<RenderFieldProps>;
    BuilderField: React.ComponentType<BuilderFieldProps>;
    EditForm: React.ComponentType<EditFormProps>;
  }>
>;

export const Fields: Fields = {
  text: {
    label: "Text",
    icon: Type,
    RenderField: RenderTextField,
    BuilderField: BuilderTextField,
    EditForm: TextCreateForm,
  },
  number: {
    label: "Number",
    icon: Sigma,
    RenderField: RenderNumberField,
    BuilderField: BuilderNumberField,
    EditForm: TextCreateForm,
  },
  checkbox: {
    label: "Checkbox",
    icon: CircleCheckBig,
    RenderField: RenderCheckboxField,
    BuilderField: BuilderCheckboxField,
    EditForm: TextCreateForm,
  },
} as const;

// ----- Types ------
export type EditFormProps = {
  field: FormSchemaField;
};

export type BuilderFieldProps = {
  field: FormSchemaField;
};

export type RenderFieldProps = {
  form: UseFormReturn;
  formField: FormSchemaField;
};
