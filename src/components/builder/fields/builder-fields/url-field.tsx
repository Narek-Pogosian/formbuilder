import { BuilderFieldProps } from "..";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuilderUrlField({ field }: BuilderFieldProps) {
  if (field.type !== "url") {
    return <></>;
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>

      {field.showDescription && field.description && (
        <p className="text-foreground-muted mb-1 text-sm">
          {field.description}
        </p>
      )}

      <Input
        type="url"
        id={field.id}
        placeholder={field.placeholder || "Your answer"}
      />
    </div>
  );
}
