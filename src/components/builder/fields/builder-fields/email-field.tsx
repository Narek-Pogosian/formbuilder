import { BuilderFieldProps } from "..";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuilderEmailField({ field }: BuilderFieldProps) {
  if (field.type !== "email") {
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
        type="email"
        id={field.id}
        placeholder={field.placeholder || "Your answer"}
      />
    </div>
  );
}
