import { FormSchema, getTextFieldSchemaValidator } from "src/types";
import { formsSlice, FormFieldState } from "./slices";
import { AppDispatch } from "./index";

export const addForm = (form: FormSchema) => (dispatch: AppDispatch) => {
  const formFields: FormFieldState[] = form.map((field) => {
    let isValid = true;

    switch (field.type) {
      case "text": {
        isValid = getTextFieldSchemaValidator(field).isValidSync(field.value);
        break;
      }
    }

    return {
      field,
      isValid,
    };
  });

  dispatch(formsSlice.actions.addForm(formFields));
};

export const updateForm =
  (index: number, form: FormSchema) => (dispatch: AppDispatch) => {
    const fields: FormFieldState[] = form.map((field) => {
      let isValid = true;

      switch (field.type) {
        case "text": {
          isValid = getTextFieldSchemaValidator(field).isValidSync(field.value);
          break;
        }
      }

      return {
        field,
        isValid,
      };
    });

    dispatch(formsSlice.actions.updateForm({ index, fields }));
  };

export const deleteForm = (index: number) => (dispatch: AppDispatch) => {
  dispatch(formsSlice.actions.deleteForm(index));
};
