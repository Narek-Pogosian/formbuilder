"use client";

import { createValidationSchema } from "./create-validation";
import { createElement } from "react";
import { FileQuestion } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/schemas/form-schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";
import { Form } from "@/components/ui/form";

interface FormRendererProps {
  onSubmit: (data: unknown) => void;
  survey: FormSchema;
}

export default function FormRenderer({ onSubmit, survey }: FormRendererProps) {
  const schema = createValidationSchema(survey);
  const form = useForm<typeof schema>({
    // @ts-expect-error it works
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  if (survey.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-16 text-center">
        <div className="bg-accent mx-auto mb-4 flex size-24 items-center justify-center rounded-full">
          <FileQuestion className="text-accent-foreground size-12" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Your form is empty</h2>
        <p className="text-foreground-muted text-sm">
          Add some questions to see how they&apos;ll appear to your respondents.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-2xl gap-10"
      >
        {survey.map((formField) => {
          return createElement(Fields[formField.type].renderField, {
            // @ts-expect-error it works
            form,
            formField,
            key: formField.id,
          });
        })}

        <Button type="submit" className="-mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
