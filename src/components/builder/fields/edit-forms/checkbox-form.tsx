import { useForm } from "react-hook-form";
import { checkboxSchema } from "@/lib/schemas/form-schemas";
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
import { EditFormProps } from "..";
import { useFormStore } from "../../hooks/use-form-store";

const checkboxFormSchema = checkboxSchema.omit({
  id: true,
  type: true,
  editing: true,
  saved: true,
});

type CheckboxFormSchemaType = z.infer<typeof checkboxFormSchema>;

export default function CheckboxEditForm({ field }: EditFormProps) {
  if (field.type !== "checkbox")
    throw Error("Need to pass in a checkbox field to checkbox form");

  const form = useForm<CheckboxFormSchemaType>({
    resolver: zodResolver(checkboxFormSchema),
    defaultValues: {
      label: field.label,
      required: field.required,
      description: field.description,
      showDescription: field.showDescription,
    },
  });

  const editField = useFormStore((state) => state.editField);

  function onSubmit(data: CheckboxFormSchemaType) {
    editField(field.id, { ...field, ...data, editing: false, saved: true });
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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

        <Button className="w-fit" type="submit" size="sm">
          Save
        </Button>
      </form>
    </Form>
  );
}
