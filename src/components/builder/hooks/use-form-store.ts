import type { FormSchema, FormSchemaField } from "@/lib/schemas/form-schemas";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface Settings {
  title: string;
  description: string;
}

interface Store {
  fields: FormSchema;
  settings: Settings;

  setSettings: (settings: Settings) => void;

  addField: (field: FormSchemaField, atIndex?: number | null) => void;
  editField: (id: string, field: FormSchemaField) => void;
  setFields: (fields: FormSchema) => void;
  removeField: (id: string) => void;
}

export const useFormStore = create(
  persist<Store>(
    (set) => ({
      fields: [],

      settings: {
        title: "",
        description: "",
      },

      setSettings: (settings) => {
        set((state) => {
          return { ...state, settings };
        });
      },

      addField: (field, atIndex) => {
        set((state) => {
          const id = field.id;

          if (typeof atIndex === "number") {
            return {
              ...state,
              fields: state.fields
                .toSpliced(atIndex, 0, field)
                .filter((f) => f.saved || f.id === id),
            };
          } else {
            return {
              ...state,
              fields: state.fields
                .filter((f) => f.saved || f.id === id)
                .concat(field),
            };
          }
        });
      },

      editField: (id, field) => {
        set((state) => ({
          ...state,
          fields: state.fields.map((f) => (f.id !== id ? f : field)),
        }));
      },

      removeField: (id) => {
        set((state) => ({
          ...state,
          fields: state.fields.filter((f) => f.id !== id),
        }));
      },

      setFields: (fields) => {
        set((state) => ({ ...state, fields }));
      },
    }),
    {
      name: "form-builder",
    },
  ),
);
