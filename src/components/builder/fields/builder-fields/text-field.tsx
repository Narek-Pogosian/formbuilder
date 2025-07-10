import { BuilderFieldProps } from "..";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuilderTextField({ field }: BuilderFieldProps) {
  if (field.type !== "text") {
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

      {field.longAnswer ? (
        <Textarea
          id={field.id}
          placeholder={field.placeholder || "Your answer"}
        />
      ) : (
        <Input id={field.id} placeholder={field.placeholder || "Your answer"} />
      )}
    </div>
  );
}
