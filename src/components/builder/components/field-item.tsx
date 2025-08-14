import { type FormSchemaField } from "@/lib/schemas/form-schemas";
import { GripVertical, Pencil, Trash2, X } from "lucide-react";
import { memo, useMemo } from "react";
import { useFormStore } from "../hooks/use-form-store";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Fields } from "../fields";
import { CSS } from "@dnd-kit/utilities";

export default memo(function FieldItem({ field }: { field: FormSchemaField }) {
  const sortable = useSortable({
    id: field.id,
    animateLayoutChanges: () => false,
  });

  const style = useMemo<React.CSSProperties>(
    () => ({
      opacity: sortable.isDragging ? 0.4 : undefined,
      transform: CSS.Translate.toString(sortable.transform),
      touchAction: "none",
      transition: sortable.transition,
    }),
    [sortable.isDragging, sortable.transform, sortable.transition],
  );

  return (
    <li
      ref={sortable.setNodeRef}
      style={style}
      className="card group/item relative h-fit p-4 transition-none lg:p-6"
    >
      {!sortable.active && (
        <div className="flex justify-between group-hover/item:opacity-100 has-focus-visible:opacity-100 max-lg:-mt-2 lg:absolute lg:-top-3 lg:-right-4 lg:-left-4 lg:opacity-0">
          {!field.editing && (
            <Button
              size="icon"
              {...sortable.listeners}
              {...sortable.attributes}
              className="group relative size-8 cursor-grab"
            >
              <GripVertical className="size-4.5" />
              <span className="sr-only">Drag</span>
            </Button>
          )}

          <FieldControls field={field} />
        </div>
      )}

      {sortable.isOver && sortable.active?.data.current?.fromSidebar && (
        <div className="bg-primary/60 absolute -top-3 left-0 h-1 w-full"></div>
      )}

      <FieldContent field={field} />
    </li>
  );
});

export function FieldItemOverlay({ field }: { field: FormSchemaField }) {
  const BuilderComponent = Fields[field.type].BuilderField;

  return (
    <li className="card group relative list-none p-4 shadow-lg lg:p-6 dark:shadow-lg/40">
      <Button
        size="icon"
        className="bg-primary/90 dark:bg-primary/80 absolute -top-3 -left-4 size-8 cursor-grabbing"
      >
        <GripVertical className="size-4.5" />
        <span className="sr-only">Drag</span>
      </Button>

      <BuilderComponent field={field} />
    </li>
  );
}

const FieldContent = memo(function C({ field }: { field: FormSchemaField }) {
  const Component = field.editing
    ? Fields[field.type].EditForm
    : Fields[field.type].BuilderField;

  return <Component field={field} />;
});

const FieldControls = ({ field }: { field: FormSchemaField }) => {
  const removeField = useFormStore((state) => state.removeField);
  const editField = useFormStore((state) => state.editField);

  const toggleEdit = () =>
    editField(field.id, { ...field, editing: !field.editing });

  return (
    <div className="ml-auto flex gap-1.5 max-lg:mb-2">
      {field.saved && (
        <Button
          size="icon"
          className="group relative size-8"
          onClick={toggleEdit}
        >
          {field.editing ? <X className="size-5.5" /> : <Pencil />}
          <span className="field-action-tooltip">
            {field.editing ? "Cancel" : "Edit"}
          </span>
        </Button>
      )}

      <Button
        size="icon"
        className="group relative size-8"
        onClick={() => removeField(field.id)}
      >
        <Trash2 className="size-4.5" />
        <span className="field-action-tooltip">Remove</span>
      </Button>
    </div>
  );
};
