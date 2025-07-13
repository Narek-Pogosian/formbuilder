import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BuilderFieldProps } from "..";
import { Label } from "@/components/ui/label";

export default function BuilderOptionField({ field }: BuilderFieldProps) {
  if (field.type !== "options") {
    return <></>;
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>

      {field.showDescription && field.description && (
        <p className="text-foreground-muted text-sm">{field.description}</p>
      )}

      <RadioGroup className="mt-2 flex flex-col space-y-1">
        {field.options.map((option) => (
          <div key={option.value} className="flex items-center gap-1">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label
              htmlFor={option.value}
              className="pl-2 font-normal capitalize"
            >
              {option.value}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
