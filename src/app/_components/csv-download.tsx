import { answersToCsv, downloadCsv } from "@/lib/utils/csv";
import { type FormSchema } from "@/lib/schemas/form-schemas";
import { type Response } from "@/server/db/schema";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

async function fetchResponses(
  formId: number,
): Promise<{ fields: FormSchema; responses: Response[] } | null> {
  try {
    const res = await fetch(`/api/response/${formId}`);

    if (!res.ok) {
      console.error(`Fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    return null;
  }
}

export default function DownloadCSVButton({
  id,
  title,
  responseCount,
}: {
  id: number;
  title: string;
  responseCount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (responseCount === 0) return;
    setIsLoading(true);

    const data = await fetchResponses(id);
    if (!data) {
      console.warn("No data returned from fetchResponses.");
      return;
    }

    const { fields, responses } = data;

    try {
      const labels = fields.map((f) => f.label);
      const csv = answersToCsv(responses, labels);

      if (!csv) {
        console.warn("CSV generation failed.");
        return;
      }

      downloadCsv(title, csv);
    } catch (error) {
      console.error("Error processing CSV download:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="secondary"
      className={cn("w-full", { "cursor-not-allowed": responseCount === 0 })}
      loading={isLoading}
      onClick={handleClick}
    >
      {!isLoading && <Download className="mr-2 h-4 w-4" />}
      Download Responses (CSV)
    </Button>
  );
}
