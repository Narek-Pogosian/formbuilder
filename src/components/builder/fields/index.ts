import { type FieldType } from "@/schemas/form-schema";
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

type Value = {
  label: string;
  icon: LucideIcon;

  //   addForm?: React.ComponentType<"">;
  //   example?: React.ComponentType<"">;
  //   renderComponent: React.ComponentType<"">
};

type FieldForms = Record<FieldType, Value>;

export const fieldForms: FieldForms = {
  title: { icon: Heading2, label: "Subtitle" },
  divide: { icon: Minus, label: "Divider" },
  paragraph: { icon: Pilcrow, label: "Paragraph" },
  text: { icon: Type, label: "Text" },
  number: { icon: Sigma, label: "Number" },
  options: { icon: ListTodo, label: "Multi Options" },
  email: { icon: Mail, label: "Email" },
  url: { icon: Link2, label: "URL" },
  checkbox: { icon: CircleCheckBig, label: "Checkbox" },
  checkboxGroup: { icon: ListChecks, label: "Checkbox Group" },
};
