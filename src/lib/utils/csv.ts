import type { Response } from "@/server/db/schema";

export function answersToCsv(responses: Response[], labels: string[]) {
  const csvRows = [];
  const answers = responses.map((a) => a.answers as Record<string, string>);
  if (answers.length === 0) {
    return;
  }

  csvRows.push(labels.join(","));

  for (const obj of answers) {
    csvRows.push(Object.values(obj).join(","));
  }

  return csvRows.join("\n");
}

export const downloadCsv = (filename: string, csv: string) => {
  const csvFile = new Blob([csv], { type: "text/csv" });
  const downloadLink = document.createElement("a");

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
