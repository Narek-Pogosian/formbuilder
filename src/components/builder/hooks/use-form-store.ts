import type { FormSchema, FormSchemaField } from "@/lib/schemas/form.schema";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface Store {
  fields: FormSchema;
  addField: (field: FormSchemaField, atIndex: number | null) => void;
  setFields: (fields: FormSchema) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create(
  persist<Store>(
    (set) => ({
      fields: [],

      addField: (field, atIndex) => {
        set((state) => {
          if (typeof atIndex === "number") {
            const newFields = [
              ...state.fields.slice(0, atIndex),
              field,
              ...state.fields.slice(atIndex),
            ];
            return { fields: newFields };
          } else {
            return { fields: state.fields.concat(field) };
          }
        });
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
    }
  )
);
