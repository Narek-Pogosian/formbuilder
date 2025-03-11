import { type FieldType } from "@/schemas/field-schemas";
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
  isLayout: boolean;

  //   addForm?: React.ComponentType<"">;
  //   example?: React.ComponentType<"">;
  //   renderComponent: React.ComponentType<"">
};

type Fields = Record<FieldType, Value>;

export const Fields: Fields = {
  title: { icon: Heading2, label: "Subtitle", isLayout: true },
  paragraph: { icon: Pilcrow, label: "Paragraph", isLayout: true },
  divide: { icon: Minus, label: "Divider", isLayout: true },

  text: { icon: Type, label: "Text", isLayout: false },
  number: { icon: Sigma, label: "Number", isLayout: false },
  options: { icon: ListTodo, label: "Multi Options", isLayout: false },
  email: { icon: Mail, label: "Email", isLayout: false },
  url: { icon: Link2, label: "URL", isLayout: false },
  checkbox: { icon: CircleCheckBig, label: "Checkbox", isLayout: false },
  checkboxGroup: { icon: ListChecks, label: "Checkbox Group", isLayout: false },
} as const;
