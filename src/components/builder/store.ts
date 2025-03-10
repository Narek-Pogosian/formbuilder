import { type FormSchema, type FormSchemaField } from "@/schemas/form-schema";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Settings = {
  settings: {
    title: string;
    description: string;
    expirationDate: Date | undefined;
    showProgressBar: boolean;
  };

  setTitle: (title: string) => void;
};

type Fields = {
  fields: FormSchema;

  addField: (field: FormSchemaField) => void;
  addFieldBelowId: (field: FormSchemaField, id: string) => void;

  removeField: (id: string) => void;
  editField: (field: FormSchemaField) => void;
  setFields: (fields: FormSchema) => void;
};

export const useFormStore = create(
  persist(
    immer<Settings & Fields>((set) => ({
      fields: [],

      settings: {
        title: "",
        description: "",
        expirationDate: undefined,
        showProgressBar: false,
      },

      setTitle: (newTitle: string) =>
        set((state) => {
          state.settings.title = newTitle;
        }),

      addField: (field: FormSchemaField) =>
        set((state) => {
          state.fields.push(field);
        }),

      addFieldBelowId: (field: FormSchemaField, id: string) =>
        set((state) => {
          const index = state.fields.findIndex((f) => f.id === id);
          if (index !== -1) {
            state.fields.splice(index + 1, 0, field);
          }
        }),

      removeField: (id: string) =>
        set((state) => {
          const index = state.fields.findIndex((f) => f.id === id);
          if (index !== -1) {
            state.fields.splice(index, 1);
          }
        }),

      editField: (updatedField: FormSchemaField) =>
        set((state) => {
          const index = state.fields.findIndex((f) => f.id === updatedField.id);
          if (index !== -1) {
            state.fields[index] = updatedField;
          }
        }),

      setFields: (fields: FormSchema) => set({ fields }),
    })),
    {
      name: "form-builder",
    },
  ),
);
