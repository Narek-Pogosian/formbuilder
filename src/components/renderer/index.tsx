"use client";

import { createElement, useEffect, useMemo } from "react";
import {
  type FormSchema,
  type FormSchemaField,
} from "@/lib/schemas/form-schemas";
import { createValidationSchema } from "./create-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fields } from "../builder/fields";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

function isVisible(field: FormSchemaField, watched: Record<string, unknown>) {
  if (!field.followUps) return true;

  return field.followUps.valueToMatch === watched[field.followUps.parentId];
}

function onSubmit(data: unknown) {
  alert(JSON.stringify(data, null, 2));
}

interface Props {
  fields: FormSchema;
}

export default function FormRenderer({ fields }: Props) {
  const schema = useMemo(() => createValidationSchema(fields), [fields]);
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const watchedValues = form.watch();

  useEffect(() => {
    for (const field of fields) {
      if (!field.followUps) continue;

      const { parentId, valueToMatch } = field.followUps;
      const parentValue = watchedValues[parentId];

      // If the condition no longer matches and the field has a value, clear it
      if (parentValue !== valueToMatch && form.getValues(field.id)) {
        form.resetField(field.id, { defaultValue: undefined });
      }
    }
  }, [watchedValues, fields, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-lg gap-6"
      >
        {fields
          .filter((f) => f.saved)
          .map((formField) => {
            if (!isVisible(formField, watchedValues)) return null;

            return createElement(Fields[formField.type].RenderField, {
              form,
              formField,
              key: formField.id,
            });
          })}

        <Button className="w-fit" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
