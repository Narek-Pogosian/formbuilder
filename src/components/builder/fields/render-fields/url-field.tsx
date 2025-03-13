import { type RenderFieldProps } from "..";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RenderUrlField({ form, formField }: RenderFieldProps) {
  if (formField.type !== "url") {
    return <div></div>;
  }

  return (
    <FormField
      control={form.control}
      name={formField.label}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">{formField.label}</FormLabel>

          {formField.showDescription && formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}

          <FormControl>
            <Input
              placeholder={formField.placeholder || "Your answer"}
              {...field}
              value={(field.value as string) ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
