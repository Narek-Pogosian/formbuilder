import { type LucideIcon } from "lucide-react";
import { FormSchemaField } from "@/schemas/form-schema";
import { createElement } from "react";
import { useFormStore } from "../store";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";

export default function FieldDialogContent() {
  const fieldDialogState = useFormStore((state) => state.fieldDialog);
  const fields = useFormStore((state) => state.fields);

  const addField = useFormStore((state) => state.addField);
  const setFieldDalogOpen = useFormStore((state) => state.setFieldDalogOpen);

  const layoutFields = Object.entries(Fields).filter(
    ([_, value]) => value.isLayout,
  );
  const formFields = Object.entries(Fields).filter(
    ([_, value]) => !value.isLayout,
  );

  if (!fieldDialogState.selectedFieldType) {
    return (
      <div className="-mt-4 grid gap-8">
        <FieldList title="Form" fields={formFields} />
        <FieldList title="Layout" fields={layoutFields} />
      </div>
    );
  }

  function handleAdd(data: FormSchemaField) {
    if (
      data.isFieldSchema &&
      fields
        .filter((field) => field.isFieldSchema)
        .find(
          (field) =>
            field.label.trim() === data.label.trim() && field.id !== data.id,
        )
    ) {
      return "Label Error";
    }

    addField(data, fieldDialogState.bellowId);
    setFieldDalogOpen(false);
  }

  return (
    <div className="-mt-4">
      {createElement(Fields[fieldDialogState.selectedFieldType].createForm, {
        handleAdd,
      })}
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
