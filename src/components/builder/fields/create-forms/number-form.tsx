import { useForm } from "react-hook-form";
import { numberSchema } from "@/schemas/field-schemas";
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
import { type CreateFormProps } from "..";
import { type z } from "zod";

const numberFormSchema = numberSchema
  .omit({
    id: true,
    type: true,
    isFieldType: true,
  })
  .refine(
    (data) => {
      if (
        typeof data.min === "number" &&
        typeof data.max === "number" &&
        data.min > data.max
      ) {
        return false;
      }

      return true;
    },
    { message: "Min value must be smaller than max value", path: ["min"] },
  );

type NumberFormSchemaType = z.infer<typeof numberFormSchema>;

export default function NumberCreateForm({
  defaultField,
  submitHandler,
}: CreateFormProps) {
  if (defaultField && defaultField.type !== "number")
    throw Error("Need to pass in a number field to number form");

  const form = useForm<NumberFormSchemaType>({
    resolver: zodResolver(numberFormSchema),
    defaultValues: {
      label: defaultField?.label ?? "",
      required: defaultField?.required ?? false,
      description: defaultField?.description ?? "",
      min: defaultField?.min ?? "",
      max: defaultField?.max ?? "",
      showDescription: defaultField?.showDescription ?? false,
    },
  });

  function onSubmit(data: NumberFormSchemaType) {
    submitHandler({
      id: crypto.randomUUID(),
      type: "number",
      isFieldType: true,
      ...data,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 gap-6"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Label*</FormLabel>
              <FormControl>
                <Input placeholder="Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex gap-8">
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center gap-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Required</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showDescription"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Show Description</FormLabel>
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
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Optional description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button className="col-span-2" type="submit">
          {defaultField ? "Edit" : "Add"}
        </Button>
      </form>
    </Form>
  );
}
