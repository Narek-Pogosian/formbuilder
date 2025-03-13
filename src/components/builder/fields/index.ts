import { type FieldType } from "@/schemas/field-schemas";
import { FormSchemaField } from "@/schemas/form-schema";
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

export type CreateFormProps = {
  submitHandler: (data: FormSchemaField) => void | "Label Error";
  defaultField?: FormSchemaField;
};

type Value = Readonly<{
  label: string;
  icon: LucideIcon;
  isFieldType: boolean;
  createForm: React.ComponentType<CreateFormProps>;
}>;

type Fields = Record<FieldType, Value>;

export const Fields: Fields = {
  title: {
    icon: Heading2,
    label: "Subtitle",
    isFieldType: false,
    createForm: TextCreateForm,
  },

  paragraph: {
    icon: Pilcrow,
    label: "Paragraph",
    isFieldType: false,
    createForm: TextCreateForm,
  },

  divide: {
    icon: Minus,
    label: "Divider",
    isFieldType: false,
    createForm: TextCreateForm,
  },

  text: {
    icon: Type,
    label: "Text",
    isFieldType: true,
    createForm: TextCreateForm,
  },

  number: {
    icon: Sigma,
    label: "Number",
    isFieldType: true,
    createForm: NumberCreateForm,
  },

  options: {
    icon: ListTodo,
    label: "Multi Options",
    isFieldType: true,
    createForm: OptionsCreateForm,
  },

  email: {
    icon: Mail,
    label: "Email",
    isFieldType: true,
    createForm: EmailCreateForm,
  },

  url: {
    icon: Link2,
    label: "URL",
    isFieldType: true,
    createForm: TextCreateForm,
  },

  checkbox: {
    icon: CircleCheckBig,
    label: "Checkbox",
    isFieldType: true,
    createForm: CheckboxCreateForm,
  },

  checkboxGroup: {
    icon: ListChecks,
    label: "Checkbox Group",
    isFieldType: true,
    createForm: TextCreateForm,
  },
} as const;
