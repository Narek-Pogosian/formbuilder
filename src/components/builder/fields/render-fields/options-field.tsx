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
import { cn } from "@/lib/utils";

export default function RenderOptionsField({
  form,
  formField,
}: RenderFieldProps) {
  if (formField.type !== "options") {
    return <></>;
  }

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn("mb-3", { "mb-0": formField.showDescription })}
          >
            {formField.label}
          </FormLabel>
          {formField.showDescription && formField.description && (
            <FormDescription className="mb-2">
              {formField.description}
            </FormDescription>
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
                  className="flex items-center gap-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="pl-2 font-normal capitalize">
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
