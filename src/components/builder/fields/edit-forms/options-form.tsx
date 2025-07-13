import { type EditFormProps } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { optionsSchema } from "@/lib/schemas/form-schemas";
import { useEditForm } from "../../hooks/use-edit-form";
import { Trash2 } from "lucide-react";

const optionsFormSchema = optionsSchema.omit({
  id: true,
  type: true,
  editing: true,
  saved: true,
});

type OptionsFormSchemaType = z.infer<typeof optionsFormSchema>;

export default function OptionsEditForm({ field }: EditFormProps) {
  if (field.type !== "options")
    throw Error("Need to pass in a option field to option form");

  const form = useForm<OptionsFormSchemaType>({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      label: field.label,
      required: field.required,
      description: field.description,
      showDescription: field.showDescription,
      options: field.options,
    },
  });

  const { onSubmit, firstInputRef } = useEditForm<OptionsFormSchemaType>(field);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="grid gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} ref={firstInputRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0 pl-1">Required</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showDescription"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0 pl-1">Show Description</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch("showDescription") && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Optional description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="mb-1">
          <FormField
            control={form.control}
            name="options"
            render={() => (
              <FormItem>
                <p className="mb-1 text-sm font-semibold">Options</p>
                {form.formState.errors.options?.root?.message && (
                  <p className="text-danger-text text-sm font-medium">
                    {form.formState.errors.options?.root?.message as string}
                  </p>
                )}

                <ul className="mb-2 space-y-2">
                  {fields.map((option, index) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name={`options.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex gap-2">
                          <FormControl className="grow">
                            <Input
                              placeholder={`Option ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            size="icon"
                            type="button"
                            variant="outline"
                            onClick={() => remove(index)}
                          >
                            <Trash2 />
                          </Button>
                        </FormItem>
                      )}
                    />
                  ))}
                </ul>

                <Button
                  type="button"
                  size="sm"
                  className="w-fit border text-xs"
                  variant="outline"
                  onClick={() => append({ value: "" })}
                >
                  Add Option
                </Button>
              </FormItem>
            )}
          />
        </div>

        <Button className="w-fit" type="submit" size="sm">
          Save
        </Button>
      </form>
    </Form>
  );
}
