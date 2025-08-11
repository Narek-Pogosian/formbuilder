import { getFormById } from "@/server/queries/form";
import { formSchema } from "@/lib/schemas/form-schemas";
import { notFound } from "next/navigation";
import ResponseForm from "../_components/response-form";

export default async function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const form = await getFormById(Number(id));
  if (!form || form.cancelled) {
    notFound();
  }

  const { data, success } = formSchema.safeParse(form.content);
  if (!data || !success) {
    notFound();
  }

  return (
    <div className="py-8 md:py-10">
      <ResponseForm
        content={data}
        title={form.title}
        description={form.description}
        formId={form.id}
      />
    </div>
  );
}
