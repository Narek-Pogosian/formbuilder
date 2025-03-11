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

  addField: (field: FormSchemaField) => void;
  addFieldBelowId: (field: FormSchemaField, id: string) => void;

  removeField: (id: string) => void;
  editField: (field: FormSchemaField) => void;
  setFields: (fields: FormSchema) => void;
};

type FieldDialog = {
  fieldDialog: {
    isOpen: boolean;
    fieldToUpdate: FormSchemaField | null;
    selectedFieldType: FieldType | null;
    bellowId: string | null;
  };

  setFieldDalogOpen: (val: boolean) => void;
  setFieldToUpdate: (field: FormSchemaField) => void;
  setSelectedFieldType: (type: FieldType | null) => void;
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
        fieldToUpdate: null,
        selectedFieldType: null,
        bellowId: null,
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

      setFieldDalogOpen: (val: boolean) =>
        set((state) => {
          if (val === true) {
            state.fieldDialog.isOpen = true;
          } else {
            state.fieldDialog = {
              isOpen: false,
              fieldToUpdate: null,
              selectedFieldType: null,
              bellowId: null,
            };
          }
        }),

      setFieldToUpdate: (field: FormSchemaField) =>
        set((state) => {
          state.fieldDialog.fieldToUpdate = field;
          state.fieldDialog.selectedFieldType = field.type;
        }),

      setSelectedFieldType: (type: FieldType | null) =>
        set((state) => {
          if (state.fieldDialog.fieldToUpdate) {
            state.fieldDialog.selectedFieldType =
              state.fieldDialog.fieldToUpdate.type;
          } else {
            state.fieldDialog.selectedFieldType = type;
          }
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
