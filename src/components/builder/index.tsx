"use client";

import { useDragHandlers } from "./hooks/use-drag-handlers";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useFormStore } from "./hooks/use-form-store";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { AddField } from "./components/add-field-dialog";
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
import { SettingsTitle } from "./components/settings";
import { memo } from "react";
import { cn } from "@/lib/utils";
import Templates from "./components/templates";

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
      <div className="grid gap-8 pb-6 lg:grid-cols-[250px_1fr] xl:grid-cols-[230px_1fr_320px]">
        <div className="card sticky top-[92px] hidden h-fit p-3 lg:block">
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

        <Overlay draggedField={draggedField} />

        <div className="card sticky top-[92px] hidden h-fit p-4 xl:block">
          <SettingsTitle />
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { setNodeRef, isOver, active } = useDroppable({ id: "last-item" });

  if (!isDesktop) {
    return fieldsLength > 0 ? (
      <AddField />
    ) : (
      <div className="mx-auto flex w-fit flex-col gap-1 pt-14">
        <AddField fromScratch />
        <Templates />
      </div>
    );
  }

  if (fieldsLength > 0) {
    return (
      <div ref={setNodeRef} className="relative h-16">
        {isOver && active?.data.current?.fromSidebar && (
          <div className="bg-primary/60 absolute -top-2.5 left-0 h-1 w-full"></div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={cn("grid h-40 place-content-center rounded", {
        "bg-accent": isOver,
      })}
    >
      <div className="text-foreground-muted text-center text-sm font-semibold">
        <p>TODO: Nice image</p>
        <p className="">No fields added yet, drag a field here</p>
        <p className="my-1.5">or</p>
        <Templates />
      </div>
    </div>
  );
});
