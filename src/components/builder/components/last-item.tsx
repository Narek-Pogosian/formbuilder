import { useMediaQuery } from "@/hooks/use-media-query";
import { useDroppable } from "@dnd-kit/core";
import { AddField } from "./add-field-dialog";
import { memo } from "react";
import { cn } from "@/lib/utils";
import Templates from "../components/templates";

export const LastItem = memo(function LastItem({
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
      <div className="text-center text-sm font-semibold">
        <p className="text-primary-text mb-2">
          Drag a field here to get started or
        </p>
        <Templates />
      </div>
    </div>
  );
});
