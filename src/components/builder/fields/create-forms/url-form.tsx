import { useForm } from "react-hook-form";
import { urlSchema } from "@/schemas/field-schemas";
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
import { type z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateFormProps } from "..";

const urlFormSchema = urlSchema.omit({
  id: true,
  type: true,
  isFieldType: true,
});
type UrlFormSchemaType = z.infer<typeof urlFormSchema>;

export default function UrlCreateForm({
  defaultField,
  submitHandler,
}: CreateFormProps) {
  if (defaultField && defaultField.type !== "url")
    throw Error("Need to pass in a url field to url form");

  const form = useForm<UrlFormSchemaType>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      placeholder: defaultField?.placeholder ?? "",
      description: defaultField?.description ?? "",
      required: defaultField?.required ?? false,
      showDescription: defaultField?.showDescription ?? false,
    },
  });

  function onSubmit(data: UrlFormSchemaType) {
    submitHandler({
      id: defaultField?.id ?? crypto.randomUUID(),
      type: "url",
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
                <Input placeholder="Website" {...field} />
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
                <Input placeholder="google.com" {...field} />
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

        <Button type="submit">{defaultField ? "Edit" : "Add"}</Button>
      </form>
    </Form>
  );
}
