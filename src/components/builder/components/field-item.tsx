import { type FormSchemaField } from "@/lib/schemas/form.schema";
import { GripVertical, Trash2 } from "lucide-react";
import { memo, type CSSProperties } from "react";
import { useFormStore } from "../hooks/use-form-store";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default memo(function FieldItem({ field }: { field: FormSchemaField }) {
  const removeField = useFormStore((state) => state.removeField);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    active,
  } = useSortable({
    id: field.id,
    animateLayoutChanges: () => false,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card ring-ring group relative rounded transition-none border px-4 py-5 duration-300 hover:ring-1",
        { "focus-within:ring-1": !isDragging }
      )}
    >
      <div
        className={cn("text-primary-text opacity-0 group-hover:opacity-100", {
          "focus-within:opacity-100": !isDragging,
        })}
      >
        <Button
          size="icon"
          variant="ghost"
          {...listeners}
          {...attributes}
          className="bg-primary/20 cursor-grab size-8 hover:bg-primary/30 dark:hover:bg-primary/30 absolute -top-3.5 -left-4 backdrop-blur-sm"
        >
          <GripVertical className="size-4.5" />{" "}
          <span className="sr-only">Drag</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="bg-primary/20 size-8 hover:bg-primary/30 dark:hover:bg-primary/30 absolute -top-3.5 -right-4 backdrop-blur-sm"
          onClick={() => removeField(field.id)}
        >
          <Trash2 className="size-4.5" />{" "}
          <span className="sr-only">Remove</span>
        </Button>
      </div>

      {isOver && active?.data.current?.fromSidebar && (
        <div className="bg-primary/60 absolute -top-2.5 left-0 h-1 w-full"></div>
      )}

      <Content field={field} />
    </li>
  );
});

const Content = memo(function ({ field }: { field: FormSchemaField }) {
  for (let index = 0; index < 10000; index++) {}

  return (
    <div>
      <span className="text-primary-text">{field.type}</span> Lorem ipsum dolor
      sit, amet consectetur adipisicing elit. Atque in iusto eveniet harum
      dignissimos amet, nobis explicabo doloremque? Consequuntur quod provident
      quae unde deserunt perferendis praesentium aspernatur magni reprehenderit
      illo?
    </div>
  );
});
Content.displayName = "Content";

export function FieldItemOverlay({ field }: { field: FormSchemaField }) {
  return (
    <li
      className={cn(
        "bg-card ring-ring group relative list-none rounded border px-4 py-5 shadow-lg duration-300 hover:ring-1 dark:shadow-lg/40"
      )}
    >
      <div className="text-primary-text opacity-0 group-hover:opacity-100">
        <Button
          size="icon"
          variant="ghost"
          className="bg-primary/20 size-8 cursor-grabbing hover:bg-primary/30 dark:hover:bg-primary/30 absolute -top-3.5 -left-4 backdrop-blur-sm"
        >
          <GripVertical className="size-4.5" />{" "}
          <span className="sr-only">Drag</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="bg-primary/20 size-8 hover:bg-primary/30 dark:hover:bg-primary/30 absolute -top-3.5 -right-4 backdrop-blur-sm"
        >
          <Trash2 className="size-4.5" />{" "}
          <span className="sr-only">Remove</span>
        </Button>
      </div>

      <div>
        <span className="text-primary-text">{field.type}</span> Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Atque in iusto eveniet
        harum dignissimos amet, nobis explicabo doloremque? Consequuntur quod
        provident quae unde deserunt perferendis praesentium aspernatur magni
        reprehenderit illo?
      </div>
    </li>
  );
}
