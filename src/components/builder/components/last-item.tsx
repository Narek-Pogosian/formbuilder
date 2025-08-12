import { useMediaQuery } from "@/hooks/use-media-query";
import { useDroppable } from "@dnd-kit/core";
import { AddField } from "./dialogs/add-field-dialog";
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
      <div className="mx-auto flex w-fit flex-col gap-2 pt-14">
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
      className={cn(
        "grid h-40 place-content-center rounded border-2 border-dashed border-black/7 transition-colors dark:border-white/10",
        {
          "bg-secondary border-black/20 dark:border-white/20": isOver,
        },
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center">
          <p className="mb-1 text-xl font-semibold">
            Drag a field here to get started
          </p>
          <p className="text-foreground-muted font-medium">
            Or quickly start from a template
          </p>
        </div>
        <Templates />
      </div>
    </div>
  );
});
