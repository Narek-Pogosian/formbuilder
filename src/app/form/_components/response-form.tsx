"use client";

import FormRenderer from "@/components/renderer";
import { type FormSchema } from "@/lib/schemas/form-schemas";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { respond } from "@/server/actions/response";

function ResponseForm({
  content,
  formId,
  title,
  description,
}: {
  formId: number;
  title: string;
  description: string | null;
  content: FormSchema;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { execute } = useAction(respond, {
    onSuccess: (res) => {
      if (res.data?.success) {
        setIsSuccess(true);
      }
    },
  });

  function handleSubmit(data: unknown) {
    execute({ formId, answers: JSON.stringify(data) });
  }

  if (isSuccess) {
    return (
      <div className="pt-32 text-center lg:pt-44">
        <h1 className="text-2xl font-semibold">Thank you for your response!</h1>
      </div>
    );
  }

  return (
    <div className="card mx-auto max-w-3xl px-4 py-10">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">{title}</h1>
        {description && (
          <p className="text-foreground-muted text-sm">{description}</p>
        )}
      </div>
      <FormRenderer onSubmit={handleSubmit} fields={content} />
    </div>
  );
}

export default ResponseForm;
