import { type EditFormProps } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
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
import { textSchema } from "@/lib/schemas/form-schemas";
import { useEditForm } from "../../hooks/use-edit-form";

const textFormSchema = textSchema.omit({
  id: true,
  type: true,
  editing: true,
  saved: true,
});

type TextFormSchemaType = z.infer<typeof textFormSchema>;

export default function TextEditForm({ field }: EditFormProps) {
  if (field.type !== "text")
    throw Error("Need to pass in a text field to text form");

  const form = useForm<TextFormSchemaType>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      label: field.label,
      required: field.required,
      longAnswer: field.longAnswer,
      placeholder: field.placeholder,
      description: field.description,
      showDescription: field.showDescription,
    },
  });

  const { onSubmit, firstInputRef } = useEditForm<TextFormSchemaType>(field);

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

        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>

              <FormControl>
                <Input placeholder="Your answer" {...field} />
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
            name="longAnswer"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0 pl-1">Long Answer</FormLabel>
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
