import { type FormSchemaField } from "@/lib/schemas/form-schemas";
import { useEffect, useRef } from "react";
import { useFormStore } from "./use-form-store";

export function useEditForm<T>(field: FormSchemaField) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const editField = useFormStore((state) => state.editField);

  function onSubmit(data: T) {
    editField(field.id, { ...field, ...data, editing: false, saved: true });
  }

  useEffect(() => {
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  }, []);

  return {
    onSubmit,
    firstInputRef,
  };
}
