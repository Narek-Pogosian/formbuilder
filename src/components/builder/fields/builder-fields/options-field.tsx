import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type BuilderFieldProps } from "..";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

      {field.multiAnswer ? (
        <div className="space-y-2">
          {field.options.map((option) => (
            <div key={option.value} className="flex items-center gap-1">
              <Checkbox value={option.value} id={option.value} />
              <Label
                htmlFor={option.value}
                className="pl-2 font-normal capitalize"
              >
                {option.value}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <RadioGroup className="mt-2 flex flex-col space-y-1">
          {field.options.map((option) => (
            <div key={option.value} className="flex items-center gap-1">
              <RadioGroupItem
                value={option.value}
                id={option.value + field.id}
              />
              <Label
                htmlFor={option.value + field.id}
                className="pl-2 font-normal capitalize"
              >
                {option.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
