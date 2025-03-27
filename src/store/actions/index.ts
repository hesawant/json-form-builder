import { FormField } from "src/types";
import { formsSlice } from "../slices";
import { AppDispatch } from "../index";

import { getFormFieldsWithErrors } from "./utils";

export const addForm = (fields: FormField[]) => (dispatch: AppDispatch) => {
  const formFields = getFormFieldsWithErrors(fields);
  dispatch(formsSlice.actions.addForm(formFields));
};

export const updateForm =
  (index: number, formFields: FormField[]) => (dispatch: AppDispatch) => {
    const fields = getFormFieldsWithErrors(formFields);
    dispatch(formsSlice.actions.updateForm({ index, fields }));
  };

export const updateFormFieldValue =
  (index: number, fieldIndex: number, field: FormField) =>
  async (dispatch: AppDispatch) => {
    const fieldStore = getFormFieldsWithErrors([field]);

    dispatch(
      formsSlice.actions.updateFormFieldValue({
        index,
        fieldIndex,
        field: fieldStore[0].field,
        errors: fieldStore[0].errors,
      })
    );
  };

export const deleteForm = (index: number) => (dispatch: AppDispatch) => {
  dispatch(formsSlice.actions.deleteForm(index));
};
