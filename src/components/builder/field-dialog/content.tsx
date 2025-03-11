import { type LucideIcon } from "lucide-react";
import { useFormStore } from "../store";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";

export default function FieldDialogContent() {
  const selectedFieldType = useFormStore(
    (state) => state.fieldDialog.selectedFieldType,
  );

  const layoutFields = Object.entries(Fields).filter(
    ([_, value]) => value.isLayout,
  );
  const formFields = Object.entries(Fields).filter(
    ([_, value]) => !value.isLayout,
  );

  if (!selectedFieldType) {
    return (
      <div className="-mt-4 grid gap-8">
        <FieldList title="Form" fields={formFields} />
        <FieldList title="Layout" fields={layoutFields} />
      </div>
    );
  }

  return (
    <div>
      <div>Field form - {selectedFieldType}</div>
    </div>
  );
}

function FieldList({
  title,
  fields,
}: {
  title: string;
  fields: [string, { label: string; icon: LucideIcon }][];
}) {
  const setSelectedFieldType = useFormStore(
    (state) => state.setSelectedFieldType,
  );

  return (
    <div>
      <h3 className="text-foreground-muted mb-4 text-sm font-bold uppercase">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {fields.map(([key, value]) => (
          <li key={key}>
            <Button
              variant="secondary"
              onClick={() => setSelectedFieldType(key as keyof typeof Fields)}
            >
              <value.icon /> {value.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
