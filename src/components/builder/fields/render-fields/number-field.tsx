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
    return <></>;
  }

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>

          {formField.showDescription && formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}

          <FormControl>
            <Input
              type="number"
              min={formField.min}
              max={formField.max}
              placeholder={formField.min?.toString() || "0"}
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
