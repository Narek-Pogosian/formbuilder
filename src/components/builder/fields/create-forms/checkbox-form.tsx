import { useForm } from "react-hook-form";
import { checkboxSchema } from "@/schemas/field-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { type z } from "zod";
import { type CreateFormProps } from "..";

const checkboxFormSchema = checkboxSchema.omit({
  id: true,
  type: true,
  isFieldType: true,
});

type CheckboxFormSchemaType = z.infer<typeof checkboxFormSchema>;

export default function CheckboxCreateForm({
  defaultField,
  submitHandler,
}: CreateFormProps) {
  if (defaultField && defaultField.type !== "checkbox")
    throw Error("Need to pass in a checkbox field to checkbox form");

  const form = useForm<CheckboxFormSchemaType>({
    resolver: zodResolver(checkboxFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      description: defaultField?.description ?? "",
      required: false,
      showDescription: defaultField?.showDescription ?? false,
    },
  });

  function onSubmit(data: CheckboxFormSchemaType) {
    submitHandler({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "checkbox",
      isFieldType: true,
      ...data,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center">
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

        <Button type="submit">{defaultField ? "Edit" : "Add"}</Button>
      </form>
    </Form>
  );
}
