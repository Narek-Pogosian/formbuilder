import { type RenderFieldProps } from "..";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RenderTextField({ form, formField }: RenderFieldProps) {
  if (formField.type !== "text") {
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
            {formField.longAnswer ? (
              <Textarea
                placeholder={formField.placeholder || "Your answer"}
                {...field}
                value={(field.value as string) ?? ""}
              />
            ) : (
              <Input
                placeholder={formField.placeholder || "Your answer"}
                {...field}
                value={(field.value as string) ?? ""}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
