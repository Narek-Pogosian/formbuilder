import { type BuilderFieldProps } from "..";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function BuilderCheckboxField({ field }: BuilderFieldProps) {
  if (field.type !== "checkbox") {
    return <></>;
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <Checkbox id={field.id} />
        <Label htmlFor={field.id} className="mb-0 pl-2">
          {field.label}
        </Label>
      </div>

      {field.showDescription && field.description && (
        <p className="text-foreground-muted text-sm">{field.description}</p>
      )}
    </div>
  );
}
