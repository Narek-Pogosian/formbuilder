import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type RenderFieldProps } from "..";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RenderOptionsField({
  form,
  formField,
}: RenderFieldProps) {
  if (formField.type !== "options") {
    return <div></div>;
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
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value as string}
              className="flex flex-col space-y-1"
            >
              {formField.options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-y-0 space-x-3"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal capitalize">
                    {option.value}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
