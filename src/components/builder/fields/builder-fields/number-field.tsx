import { BuilderFieldProps } from "..";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuilderNumberField({ field }: BuilderFieldProps) {
  if (field.type !== "number") {
    return <></>;
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>

      {field.showDescription && field.description && (
        <p className="mb-1 text-sm text-foreground-muted">
          {field.description}
        </p>
      )}

      <Input
        type="number"
        id={field.id}
        placeholder={field.min?.toString() || "0"}
      />
    </div>
  );
}
