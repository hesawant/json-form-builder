import { FormSchema, getTextFieldSchemaValidator } from "src/types";
import { formsSlice, FormFieldState } from "./slices";
import { AppDispatch, RootState } from "./index";

export const addForm = (form: FormSchema) => (dispatch: AppDispatch) => {
  const formFields: FormFieldState[] = form.map((field) => {
    let value: string | undefined;
    const errors: string[] = [];

    switch (field.type) {
      case "text": {
        const validators = getTextFieldSchemaValidator(field);
        validators.forEach(({ validator, error }) => {
          const valid = validator.isValidSync(field.value);
          if (!valid) {
            errors.push(error);
          }
        });

        value = field.value || "";
        break;
      }
    }

    return { field, value, errors };
  });

  dispatch(formsSlice.actions.addForm(formFields));
};

export const updateForm =
  (index: number, form: FormSchema) => (dispatch: AppDispatch) => {
    const fields: FormFieldState[] = form.map((field) => {
      let value: string | undefined;
      const errors: string[] = [];

      switch (field.type) {
        case "text": {
          const validators = getTextFieldSchemaValidator(field);

          validators.forEach(({ validator, error }) => {
            const valid = validator.isValidSync(field.value);
            if (!valid) {
              errors.push(error);
            }
          });

          value = field.value || ""; // falling back to empty string because if value is undefined the field value is not updated.
          break;
        }
      }

      return { field, value, errors };
    });

    dispatch(formsSlice.actions.updateForm({ index, fields }));
  };

export const updateFormFieldValue =
  (index: number, fieldIndex: number, value: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const form = state.forms.forms[index];
    const field = form.fields[fieldIndex].field;

    const errors: string[] = [];
    if (field.type === "text") {
      const validators = getTextFieldSchemaValidator(field);

      validators.forEach(({ validator, error }) => {
        const valid = validator.isValidSync(value);
        if (!valid) {
          errors.push(error);
        }
      });
    }

    dispatch(
      formsSlice.actions.updateFormFieldValue({
        index,
        fieldIndex,
        value,
        errors,
      })
    );
  };

export const deleteForm = (index: number) => (dispatch: AppDispatch) => {
  dispatch(formsSlice.actions.deleteForm(index));
};
