import { GripVertical, type LucideIcon } from "lucide-react";
import { type FieldType } from "@/lib/schemas/form-schemas";
import { createElement } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Fields } from "../fields";
import { Button } from "@/components/ui/button";

export default function FieldPanel() {
  return (
    <ul className="grid">
      {Object.entries(Fields).map(([key, field]) => (
        <li key={field.label}>
          <FieldsPanelItem fieldType={key as FieldType} icon={field.icon} />
        </li>
      ))}
    </ul>
  );
}

function FieldsPanelItem({
  fieldType,
  icon,
}: {
  fieldType: FieldType;
  icon: LucideIcon;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: fieldType,
    data: {
      fromSidebar: true,
    },
  });

  return (
    <Button
      variant="ghost"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      className="relative w-full cursor-grab justify-start gap-2 capitalize"
    >
      <GripVertical className="size-4 opacity-30" />
      {createElement(icon)}
      {fieldType}
    </Button>
  );
}

export function FieldPanelOverlay({ fieldType }: { fieldType: FieldType }) {
  return (
    <button className="card flex h-12 w-[225px] cursor-grabbing items-center gap-2 px-6 py-2.5 font-semibold capitalize shadow-lg dark:shadow-lg/40 [&>svg]:size-5">
      {createElement(Fields[fieldType].icon)}
      {fieldType}
    </button>
  );
}
