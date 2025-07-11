import type { FormSchema, FormSchemaField } from "@/lib/schemas/form-schemas";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface Store {
  fields: FormSchema;
  addField: (field: FormSchemaField, atIndex?: number | null) => void;
  editField: (id: string, field: FormSchemaField) => void;
  setFields: (fields: FormSchema) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create(
  persist<Store>(
    (set) => ({
      fields: [],

      addField: (field, atIndex) => {
        set((state) => {
          const id = field.id;

          if (typeof atIndex === "number") {
            return {
              fields: state.fields
                .toSpliced(atIndex, 0, field)
                .filter((f) => f.saved || f.id === id),
            };
          } else {
            return { fields: state.fields.concat(field) };
          }
        });
      },

      editField: (id, field) => {
        set((state) => ({
          fields: state.fields.map((f) => (f.id !== id ? f : field)),
        }));
      },

      removeField: (id) => {
        set((state) => ({ fields: state.fields.filter((f) => f.id !== id) }));
      },

      setFields: (fields) => {
        set(() => ({ fields }));
      },
    }),
    {
      name: "form-builder",
    },
  ),
);
