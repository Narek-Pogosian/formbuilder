"use client";

import { useDragHandlers } from "./hooks/use-drag-handlers";
import { useFormStore } from "./hooks/use-form-store";
import FieldPanel from "./components/field-panel";
import FieldItem from "./components/field-item";
import Overlay from "./components/overlay";
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
  useDroppable,
} from "@dnd-kit/core";
import { memo } from "react";
import { cn } from "@/lib/utils";

export default function Builder() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { draggedField, handleDragStart, handleDragOver, handleDragEnd } =
    useDragHandlers();

  const fields = useFormStore((state) => state.fields);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[230px_1fr_360px]">
        <div className="bg-card sticky top-[94px] hidden h-fit rounded border p-3 lg:block">
          <FieldPanel />
        </div>

        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="mx-auto grid w-full max-w-xl gap-5">
            {fields.map((field) => (
              <FieldItem key={field.id} field={field} />
            ))}
            <LastItem fieldsLength={fields.length} />
          </ul>
        </SortableContext>

        <Overlay draggedField={draggedField} />

        <div className="bg-card sticky top-[94px] hidden h-fit rounded border p-3 xl:block">
          Settings
        </div>
      </div>
    </DndContext>
  );
}

const LastItem = memo(function LastItem({
  fieldsLength,
}: {
  fieldsLength: number;
}) {
  const { setNodeRef, isOver, active } = useDroppable({ id: "last-item" });

  if (fieldsLength === 0) {
    return (
      <div
        className={cn(
          "h-40 rounded grid place-content-center border border-dashed border-black/20 dark:border-white/15",
          { "bg-primary/5": isOver }
        )}
        ref={setNodeRef}
      >
        <p className="text-sm font-semibold">
          No fields added, drag a field here
        </p>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className="h-20 relative">
      {isOver && active?.data.current?.fromSidebar && (
        <div className="bg-primary/60 absolute -top-2.5 left-0 h-1 w-full"></div>
      )}
    </div>
  );
});
