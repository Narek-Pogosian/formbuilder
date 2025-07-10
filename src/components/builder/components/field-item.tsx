import { type FormSchemaField } from "@/lib/schemas/form-schemas";
import { GripVertical, Pencil, Trash2, X } from "lucide-react";
import { createElement, memo, useMemo } from "react";
import { useFormStore } from "../hooks/use-form-store";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";
import { CSS } from "@dnd-kit/utilities";

export default memo(function FieldItem({ field }: { field: FormSchemaField }) {
  const {
    setNodeRef,
    attributes,
    isDragging,
    listeners,
    transform,
    transition,
    isOver,
    active,
  } = useSortable({
    id: field.id,
    animateLayoutChanges: () => false,
  });

  const style = useMemo<React.CSSProperties>(
    () => ({
      opacity: isDragging ? 0.5 : undefined,
      transform: CSS.Translate.toString(transform),
      touchAction: "none",
      transition,
    }),
    [isDragging, transform, transition],
  );

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-card ring-ring group relative rounded border p-4 transition-none hover:ring-1 has-focus-visible:ring-1 lg:p-6"
    >
      <div className="text-primary-text flex justify-between group-hover:opacity-100 has-focus-visible:opacity-100 max-lg:-mt-2 lg:absolute lg:-top-3.5 lg:-right-4 lg:-left-4 lg:opacity-0">
        {!field.editing && (
          <Button
            size="icon"
            variant="secondary"
            {...listeners}
            {...attributes}
            className="size-8 cursor-grab"
          >
            <GripVertical className="size-4.5" />
            <span className="sr-only">Drag</span>
          </Button>
        )}

        {!isDragging && <FieldControls field={field} />}
      </div>

      {isOver && active?.data.current?.fromSidebar && (
        <div className="bg-primary/60 absolute -top-3 left-0 h-1 w-full"></div>
      )}

      <Content field={field} />
    </li>
  );
});

const Content = memo(function Content({ field }: { field: FormSchemaField }) {
  if (field.editing) {
    return <>{createElement(Fields[field.type].EditForm, { field })}</>;
  }

  return <>{createElement(Fields[field.type].BuilderField, { field })}</>;
});

function FieldControls({ field }: { field: FormSchemaField }) {
  const removeField = useFormStore((state) => state.removeField);
  const editField = useFormStore((state) => state.editField);

  return (
    <div className="max-lg ml-auto flex gap-1 max-lg:mb-4 lg:flex-col">
      <Button
        size="icon"
        variant="secondary"
        className="size-8"
        onClick={() => removeField(field.id)}
      >
        <Trash2 className="size-4.5" />
        <span className="sr-only">Remove</span>
      </Button>

      {field.saved && (
        <Button
          size="icon"
          variant="secondary"
          className="size-8"
          aria-label={!field.editing ? "Edit" : "Cancel"}
          onClick={() =>
            editField(field.id, { ...field, editing: !field.editing })
          }
        >
          {!field.editing ? (
            <Pencil className="size-4.5" />
          ) : (
            <X className="size-5.5" />
          )}
        </Button>
      )}
    </div>
  );
}

export function FieldItemOverlay({ field }: { field: FormSchemaField }) {
  return (
    <li className="bg-card ring-ring group relative list-none rounded border p-4 shadow-lg ring-1 lg:p-6 dark:shadow-lg/40">
      <Button
        size="icon"
        variant="secondary"
        className="absolute -top-3.5 -left-4 size-8 cursor-grabbing"
      >
        <GripVertical className="size-4.5" />
        <span className="sr-only">Drag</span>
      </Button>

      <Content field={field} />
    </li>
  );
}
