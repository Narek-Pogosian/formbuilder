"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type FormSchemaField } from "@/schemas/form-schema";
import { useFormStore } from "./store";

const SortableItem = ({ field }: { field: FormSchemaField }) => {
  const removeField = useFormStore((state) => state.removeField);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group flex gap-2">
      <button
        className="text-foreground-muted opacity-50"
        onClick={() => removeField(field.id)}
      >
        <Trash2 className="size-5" />
      </button>
      <button
        {...listeners}
        {...attributes}
        className="text-foreground-muted cursor-grab opacity-50"
      >
        <GripVertical />
      </button>
      <div className="bg-card grow rounded-md p-4">Item {field.id}</div>
    </div>
  );
};

export default function SortableList() {
  const fields = useFormStore((state) => state.fields);
  const setFields = useFormStore((state) => state.setFields);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over.id);

      setFields(arrayMove(fields, activeIndex, overIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fields} strategy={verticalListSortingStrategy}>
        <div className="mx-auto mb-8 grid max-w-3xl gap-8">
          {fields.map((field) => (
            <SortableItem key={field.id} field={field} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
