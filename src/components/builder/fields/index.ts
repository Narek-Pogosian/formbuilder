import {
  CircleCheckBig,
  Link2,
  Mail,
  Sigma,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { FieldType, FormSchemaField } from "@/lib/schemas/form-schemas";
import type { UseFormReturn } from "react-hook-form";
import RenderTextField from "./render-fields/text-field";
import RenderNumberField from "./render-fields/number-field";
import RenderCheckboxField from "./render-fields/checkbox-field";
import BuilderTextField from "./builder-fields/text-field";
import BuilderNumberField from "./builder-fields/number-field";
import BuilderCheckboxField from "./builder-fields/checkbox-field";
import TextEditForm from "./edit-forms/text-form";
import NumberEditForm from "./edit-forms/number-form";
import CheckboxEditForm from "./edit-forms/checkbox-form";
import EmailEditForm from "./edit-forms/email-form";
import UrlEditForm from "./edit-forms/url-form";
import RenderEmailField from "./render-fields/email-field";
import RenderUrlField from "./render-fields/url-field";
import BuilderEmailField from "./builder-fields/email-field";
import BuilderUrlField from "./builder-fields/url-field";

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
    EditForm: TextEditForm,
  },
  email: {
    label: "Email",
    icon: Mail,
    RenderField: RenderEmailField,
    BuilderField: BuilderEmailField,
    EditForm: EmailEditForm,
  },
  url: {
    label: "URL",
    icon: Link2,
    RenderField: RenderUrlField,
    BuilderField: BuilderUrlField,
    EditForm: UrlEditForm,
  },
  number: {
    label: "Number",
    icon: Sigma,
    RenderField: RenderNumberField,
    BuilderField: BuilderNumberField,
    EditForm: NumberEditForm,
  },
  checkbox: {
    label: "Checkbox",
    icon: CircleCheckBig,
    RenderField: RenderCheckboxField,
    BuilderField: BuilderCheckboxField,
    EditForm: CheckboxEditForm,
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
