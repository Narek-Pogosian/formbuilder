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

function FormRenderer({ onSubmit, survey }: FormRendererProps) {
  const schema = createValidationSchema(survey);
  const form = useForm<typeof schema>({
    // @ts-expect-error should work
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  if (survey.length === 0) {
    return (
      <div className="mx-auto mb-8 pt-16 text-center">
        <div className="bg-primary/5 mx-auto mb-4 flex size-20 items-center justify-center rounded-full">
          <FileQuestion className="text-primary size-10" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Your survey is empty.</h2>
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
        className="mx-auto grid w-full max-w-2xl gap-y-8"
      >
        {survey.map((formField, i) => {
          return createElement(Fields[formField.type].renderField, {
            // @ts-expect-error it works
            form,
            formField,
            key: i,
          });
        })}

        <Button type="submit" className="-mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default FormRenderer;
