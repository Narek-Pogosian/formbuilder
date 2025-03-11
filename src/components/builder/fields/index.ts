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

import TextCreateForm from "./create-forms/text-create-form";

export type CreateFormProps = {
  handleAdd: (data: FormSchemaField) => void | "Label Error";
};

type Value = Readonly<{
  label: string;
  icon: LucideIcon;
  isLayout: boolean;
  createForm: React.ComponentType<CreateFormProps>;
}>;

type Fields = Record<FieldType, Value>;

export const Fields: Fields = {
  title: {
    icon: Heading2,
    label: "Subtitle",
    isLayout: true,
    createForm: TextCreateForm,
  },

  paragraph: {
    icon: Pilcrow,
    label: "Paragraph",
    isLayout: true,
    createForm: TextCreateForm,
  },

  divide: {
    icon: Minus,
    label: "Divider",
    isLayout: true,
    createForm: TextCreateForm,
  },

  text: {
    icon: Type,
    label: "Text",
    isLayout: false,
    createForm: TextCreateForm,
  },

  number: {
    icon: Sigma,
    label: "Number",
    isLayout: false,
    createForm: TextCreateForm,
  },

  options: {
    icon: ListTodo,
    label: "Multi Options",
    isLayout: false,
    createForm: TextCreateForm,
  },

  email: {
    icon: Mail,
    label: "Email",
    isLayout: false,
    createForm: TextCreateForm,
  },

  url: {
    icon: Link2,
    label: "URL",
    isLayout: false,
    createForm: TextCreateForm,
  },

  checkbox: {
    icon: CircleCheckBig,
    label: "Checkbox",
    isLayout: false,
    createForm: TextCreateForm,
  },

  checkboxGroup: {
    icon: ListChecks,
    label: "Checkbox Group",
    isLayout: false,
    createForm: TextCreateForm,
  },
} as const;
