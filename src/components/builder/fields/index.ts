import { type FieldType } from "@/schemas/field-schemas";
import { type UseFormReturn } from "react-hook-form";
import { type FormSchemaField } from "@/schemas/form-schema";

import {
  CircleCheckBig,
  Heading2,
  Link2,
  ListChecks,
  ListTodo,
  Mail,
  Minus,
  Pilcrow,
  Sigma,
  Type,
  type LucideIcon,
} from "lucide-react";

import TextCreateForm from "./create-forms/text-form";
import NumberCreateForm from "./create-forms/number-form";
import EmailCreateForm from "./create-forms/email-form";
import CheckboxCreateForm from "./create-forms/checkbox-form";
import OptionsCreateForm from "./create-forms/options-form";
import RenderTextField from "./render-fields/text-field";
import RenderNumberField from "./render-fields/number-field";
import RenderOptionsField from "./render-fields/options-field";
import RenderEmailField from "./render-fields/email-field";
import RenderUrlField from "./render-fields/url-field";
import RenderCheckboxField from "./render-fields/checkbox-field";

export type CreateFormProps = {
  submitHandler: (data: FormSchemaField) => void | "Label Error";
  defaultField?: FormSchemaField;
};

export type RenderFieldProps = {
  form: UseFormReturn;
  formField: FormSchemaField;
};

type Value = Readonly<{
  label: string;
  icon: LucideIcon;
  isFieldType: boolean;
  createForm: React.ComponentType<CreateFormProps>;
  renderField: React.ComponentType<RenderFieldProps>;
}>;

type Fields = Record<FieldType, Value>;

export const Fields: Fields = {
  title: {
    icon: Heading2,
    label: "Subtitle",
    isFieldType: false,
    createForm: TextCreateForm,
    renderField: RenderTextField,
  },

  paragraph: {
    icon: Pilcrow,
    label: "Paragraph",
    isFieldType: false,
    createForm: TextCreateForm,
    renderField: RenderTextField,
  },

  divide: {
    icon: Minus,
    label: "Divider",
    isFieldType: false,
    createForm: TextCreateForm,
    renderField: RenderTextField,
  },

  text: {
    icon: Type,
    label: "Text",
    isFieldType: true,
    createForm: TextCreateForm,
    renderField: RenderTextField,
  },

  number: {
    icon: Sigma,
    label: "Number",
    isFieldType: true,
    createForm: NumberCreateForm,
    renderField: RenderNumberField,
  },

  options: {
    icon: ListTodo,
    label: "Multi Options",
    isFieldType: true,
    createForm: OptionsCreateForm,
    renderField: RenderOptionsField,
  },

  email: {
    icon: Mail,
    label: "Email",
    isFieldType: true,
    createForm: EmailCreateForm,
    renderField: RenderEmailField,
  },

  url: {
    icon: Link2,
    label: "URL",
    isFieldType: true,
    createForm: TextCreateForm,
    renderField: RenderUrlField,
  },

  checkbox: {
    icon: CircleCheckBig,
    label: "Checkbox",
    isFieldType: true,
    createForm: CheckboxCreateForm,
    renderField: RenderCheckboxField,
  },

  checkboxGroup: {
    icon: ListChecks,
    label: "Checkbox Group",
    isFieldType: true,
    createForm: TextCreateForm,
    renderField: RenderCheckboxField,
  },
} as const;
