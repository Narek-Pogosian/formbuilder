"use client";

import FieldPanel, { FieldPanelOverlay } from "./components/field-panel";
import FieldItem, { FieldItemOverlay } from "./components/field-item";
import { useDragHandlers } from "./hooks/use-drag-handlers";
import { useFormStore } from "./hooks/use-form-store";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { type FieldType } from "@/lib/schemas/form-schemas";
import { SettingsTitle } from "./components/settings";
import { LastItem } from "./components/last-item";

export default function Builder() {
  const isMounted = useIsMounted();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { draggedField, handleDragStart, handleDragOver, handleDragEnd } =
    useDragHandlers();

  const fields = useFormStore((state) => state.fields);

  if (!isMounted) {
    return <div className="h-32"></div>;
  }

  return (
    <DndContext
      id="list"
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[230px_1fr_320px]">
        <div className="card sticky top-[94px] hidden h-fit p-3 lg:block">
          <FieldPanel />
        </div>

        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="mx-auto grid h-fit w-full max-w-xl gap-5">
            {fields.map((field) => (
              <FieldItem key={field.id} field={field} />
            ))}
            <LastItem fieldsLength={fields.length} />
          </ul>
        </SortableContext>

        <DragOverlay
          dropAnimation={draggedField?.fromSidebar ? null : { duration: 200 }}
        >
          {draggedField &&
            (draggedField.fromSidebar ? (
              <FieldPanelOverlay
                fieldType={draggedField.draggingId as FieldType}
              />
            ) : (
              <FieldItemOverlay
                field={fields.find((f) => f.id === draggedField.draggingId)!}
              />
            ))}
        </DragOverlay>

        <div className="card sticky top-[94px] hidden h-fit p-4 xl:block">
          <SettingsTitle />
        </div>
      </div>
    </DndContext>
  );
}
