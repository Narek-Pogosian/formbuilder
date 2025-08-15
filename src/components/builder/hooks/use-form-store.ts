import {
  type FormSchema,
  type FormSchemaField,
} from "@/lib/schemas/form-schemas";
import { storageSchema } from "@/lib/schemas/storage-schema";
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

  reset: () => void;
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

      reset: () => {
        set(() => ({
          settings: {
            title: "",
            description: "",
          },
          fields: [],
        }));
      },
    }),
    {
      name: "form-builder",
      partialize: (state) => {
        return { ...state, fields: state.fields.filter((f) => f.saved) };
      },
      merge: (fromStorage, state) => {
        const { data, success } = storageSchema.safeParse(fromStorage);
        if (!success) return state;

        return {
          ...state,
          fields: data.fields.map((f) => ({ ...f, editing: false })),
          settings: data.settings,
        };
      },
    },
  ),
);
