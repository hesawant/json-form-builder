import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormField } from "src/types";

export type FormFieldState = {
  field: FormField;
  errors: string[];
};

export type FormState = {
  fields: FormFieldState[];
};

export type FormsState = {
  forms: FormState[];
};

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormFieldState[]>) => {
      state.forms = [...state.forms, { fields: action.payload }];
    },

    updateForm: (
      state,
      action: PayloadAction<{
        index: number;
        fields: FormFieldState[];
      }>
    ) => {
      const { index, fields } = action.payload;
      state.forms[index] = { fields };
    },

    updateFormField: (
      state,
      action: PayloadAction<{
        index: number;
        fieldIndex: number;
        field: FormFieldState;
      }>
    ) => {
      const { index, fieldIndex, field } = action.payload;
      state.forms[index].fields[fieldIndex] = field;
    },

    updateFormFieldValue: (
      state,
      action: PayloadAction<{
        index: number;
        fieldIndex: number;
        field: FormField;
        errors: string[];
      }>
    ) => {
      const { index, fieldIndex, field, errors } = action.payload;
      state.forms[index].fields[fieldIndex].field = field;
      state.forms[index].fields[fieldIndex].errors = errors;
    },

    deleteForm: (state, action: PayloadAction<number>) => {
      state.forms = state.forms.filter((_, index) => index !== action.payload);
    },
  },
});
