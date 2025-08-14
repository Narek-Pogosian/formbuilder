"use client";

import { type getAllForms } from "@/server/queries/form";
import { Users } from "lucide-react";
import FormActions from "./form-actions";
import SharePopover from "./share-popover";
import DownloadCSVButton from "./csv-download";

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
