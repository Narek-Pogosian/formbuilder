import { type DraggedField } from "../hooks/use-drag-handlers";
import { FieldPanelOverlay } from "./field-panel";
import { FieldItemOverlay } from "./field-item";
import { type FieldType } from "@/lib/schemas/form-schemas";
import { useFormStore } from "../hooks/use-form-store";
import { DragOverlay } from "@dnd-kit/core";

export default function Overlay({
  draggedField,
}: {
  draggedField: DraggedField | null;
}) {
  const fields = useFormStore((state) => state.fields);

  return (
    <DragOverlay
      dropAnimation={draggedField?.fromSidebar ? null : { duration: 200 }}
    >
      {draggedField &&
        (draggedField.fromSidebar ? (
          <FieldPanelOverlay fieldType={draggedField.draggingId as FieldType} />
        ) : (
          <FieldItemOverlay
            field={fields.find((f) => f.id === draggedField.draggingId)!}
          />
        ))}
    </DragOverlay>
  );
}
