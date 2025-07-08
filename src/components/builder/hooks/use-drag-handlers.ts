import { useFormStore } from "./use-form-store";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import {
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { FieldType, FormSchemaField } from "@/lib/schemas/form-schemas";

export interface DraggedField {
  draggingId: string;
  fromSidebar: boolean;
}

export function useDragHandlers() {
  const fields = useFormStore((state) => state.fields);
  const setFields = useFormStore((state) => state.setFields);
  const addField = useFormStore((state) => state.addField);

  const [draggedField, setDraggedField] = useState<DraggedField | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setDraggedField({
      draggingId: event.active.id as string,
      fromSidebar: event.active.data.current!.fromSidebar,
    });
  }

  function handleDragOver(event: DragOverEvent) {
    if (!event.active.data.current!.fromSidebar) return;

    const overId = event.over?.id;
    if (!overId) {
      setDragOverIndex(null);
      return;
    }

    if (overId === "last-item") {
      setDragOverIndex(fields.length);
    } else {
      const overIndex = fields.findIndex((field) => field.id === overId);
      if (overIndex >= 0) {
        setDragOverIndex(overIndex);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.data.current && active.data.current.fromSidebar) {
      if (dragOverIndex !== null) {
        addField(getDefaultField(active.id as FieldType), dragOverIndex);
      }
    } else if (over && active.id !== over.id) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over.id);

      setFields(arrayMove(fields, activeIndex, overIndex));
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setTimeout(() => {
      setDraggedField(null);
    }, 200);

    setDragOverIndex(null);
  }

  return {
    draggedField,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}

function getDefaultField(type: FieldType): FormSchemaField {
  const base = {
    id: crypto.randomUUID(),
    label: "",
    required: false,
    description: "",
    showDescription: false,
    editing: true,
    saved: false,
    followUps: undefined,
  };

  switch (type) {
    case "text":
      return {
        ...base,
        type: "text",
        longAnswer: false,
        placeholder: "",
      };

    case "number":
      return {
        ...base,
        type: "number",
        min: "",
        max: "",
      };

    case "checkbox":
      return {
        ...base,
        type: "checkbox",
      };

    default:
      throw new Error("Unknown field type");
  }
}
