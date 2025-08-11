"use client";

import { type getAllForms } from "@/server/queries/form";
import { Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormActions from "./form-actions";
import SharePopover from "./share-popover";

interface Props {
  form: Awaited<ReturnType<typeof getAllForms>>[number];
}

export default function FormCard({ form }: Props) {
  return (
    <div className="card space-y-6 px-6 py-5">
      <div className="flex justify-between gap-2">
        <h3 className="font-semibold">{form.title}</h3>

        <div className="flex items-center">
          <FormActions cancelled={form.cancelled} id={form.id} />
          {!form.cancelled && <SharePopover id={form.id} />}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {form.cancelled && (
          <div className="text-danger-text text-sm">Cancelled</div>
        )}
        <div className="text-foreground-muted flex items-center">
          <Users className="mr-2 h-5 w-5" />
          <span className="text-sm font-semibold">
            {form.responseCount}{" "}
            {form.responseCount === 1 ? "Response" : "Responses"}
          </span>
        </div>
      </div>

      <DownloadCSVButton
        id={form.id}
        title={form.title}
        responseCount={form.responseCount}
      />
    </div>
  );
}

function DownloadCSVButton({
  id,
  title,
  responseCount,
}: {
  id: number;
  title: string;
  responseCount: number;
}) {
  async function handleClick() {
    if (responseCount === 0) return;
    console.log(id, title);

    // const data = await fetchResponses(id);

    // if (!data) {
    //   console.warn("No data returned from fetchResponses.");
    //   return;
    // }

    // const { form, responses } = data;

    try {
      // const fields = parsePrismaJson(form) as FormSchema;
      // const labels = fields.filter((f) => f.isFieldType).map((f) => f.label);
      // const csv = answersToCsv(responses, labels);
      // if (!csv) {
      //   console.warn("CSV generation failed.");
      //   return;
      // }
      // downloadCsv(title, csv);
    } catch (error) {
      console.error("Error processing CSV download:", error);
    }
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      disabled={responseCount === 0}
      className="w-full"
      onClick={handleClick}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Responses (CSV)
    </Button>
  );
}
