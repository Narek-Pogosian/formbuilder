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

export default function RenderNumberField({
  form,
  formField,
}: RenderFieldProps) {
  if (formField.type !== "number") {
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
              type="number"
              min={formField.min}
              max={formField.max}
              placeholder={formField.min?.toString() ?? ""}
              {...field}
              value={(field.value as number | string) ?? ""}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
