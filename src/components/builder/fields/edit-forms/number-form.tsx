import { Resolver, useForm } from "react-hook-form";
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
import { numberSchema } from "@/lib/schemas/form-schemas";
import { EditFormProps } from "..";
import { useEditForm } from "../../hooks/use-edit-form";

const numberFormSchema = numberSchema
  .omit({
    id: true,
    type: true,
    editing: true,
    saved: true,
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

export default function NumberEditForm({ field }: EditFormProps) {
  if (field.type !== "number")
    throw Error("Need to pass in a number field to number form");

  const form = useForm<NumberFormSchemaType>({
    resolver: zodResolver(numberFormSchema) as Resolver<NumberFormSchemaType>,
    defaultValues: {
      label: field.label,
      required: field.required,
      description: field.description,
      showDescription: field.showDescription,
      min: field.min,
      max: field.max,
    },
  });

  const { onSubmit, firstInputRef } = useEditForm<NumberFormSchemaType>(field);

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
                <Input placeholder="Age" {...field} ref={firstInputRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="min"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Minimum value</FormLabel>
                <FormControl>
                  <Input
                    className="h-fit"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Maximum value</FormLabel>
                <FormControl>
                  <Input
                    className="h-fit"
                    type="number"
                    placeholder="100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
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
              <FormItem className="flex items-center gap-1">
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
