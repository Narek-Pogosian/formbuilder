import { type FormSchema, type FormSchemaField } from "@/schemas/form-schema";
import { type FieldType } from "@/schemas/field-schemas";
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

  addField: (field: FormSchemaField, bellowId?: string) => void;
  removeField: (id: string) => void;
  editField: (field: FormSchemaField) => void;
  setFields: (fields: FormSchema) => void;
};

type FieldDialog = {
  fieldDialog: {
    isOpen: boolean;
    selectedFieldType: FieldType | undefined;
    bellowId: string | undefined;
  };

  setFieldDalogOpen: (val: boolean) => void;
  setSelectedFieldType: (type: FieldType | undefined) => void;
  setBellowId: (id: string) => void;
};

type Store = Settings & Fields & FieldDialog;

export const useFormStore = create(
  persist(
    immer<Store>((set) => ({
      fields: [],

      settings: {
        title: "",
        description: "",
        expirationDate: undefined,
        showProgressBar: false,
      },

      fieldDialog: {
        isOpen: false,
        selectedFieldType: undefined,
        bellowId: undefined,
      },

      setTitle: (newTitle: string) =>
        set((state) => {
          state.settings.title = newTitle;
        }),

      addField: (field: FormSchemaField, bellowId?: string) =>
        set((state) => {
          if (bellowId) {
            const index = state.fields.findIndex((f) => f.id === bellowId);
            if (index !== -1) {
              state.fields.splice(index + 1, 0, field);
            }
          } else {
            state.fields.push(field);
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

      setFieldDalogOpen: (val: boolean) =>
        set((state) => {
          if (val === true) {
            state.fieldDialog.isOpen = true;
          } else {
            state.fieldDialog = {
              isOpen: false,
              selectedFieldType: undefined,
              bellowId: undefined,
            };
          }
        }),

      setSelectedFieldType: (type: FieldType | undefined) =>
        set((state) => {
          state.fieldDialog.selectedFieldType = type;
        }),

      setBellowId: (id: string) =>
        set((state) => {
          state.fieldDialog.bellowId = id;
        }),
    })),
    {
      name: "form-builder",
      partialize: (state) => ({
        fields: state.fields,
        settings: state.settings,
      }),
    },
  ),
);
