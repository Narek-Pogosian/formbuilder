import { type RenderFieldProps } from "..";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RenderCheckboxField({
  form,
  formField,
}: RenderFieldProps) {
  if (formField.type !== "checkbox") {
    return <div></div>;
  }

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value as boolean | undefined}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="mb-0">{formField.label}</FormLabel>
          </div>

          <FormMessage />

          {formField.showDescription && formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
