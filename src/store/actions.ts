import {
  FormField,
  FormSchema,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
} from "src/types";
import { formsSlice, FormFieldState } from "./slices";
import { AppDispatch } from "./index";

export const addForm = (form: FormSchema) => (dispatch: AppDispatch) => {
  const formFields: FormFieldState[] = form.map((field) => {
    let value: string | undefined;
    const errors: string[] = [];

    switch (field.type) {
      case "text": {
        const validators = getTextFieldSchemaValidators(field);
        validators.forEach(({ validator, error }) => {
          const valid = validator.isValidSync(field.value);
          if (!valid) {
            errors.push(error);
          }
        });

        value = field.value || "";
        break;
      }
      case "select": {
        const validators = getSelectSchemaValidators(field);

        validators.forEach(({ validator, error }) => {
          const valid = validator.isValidSync(field.value);
          if (!valid) {
            errors.push(error);
          }
        });

        value = field.value;

        break;
      }
      case "radio": {
        const validators = getRadioSchemaValidators(field);
        validators.forEach(({ validator, error }) => {
          const valid = validator.isValidSync(field.value);
          if (!valid) {
            errors.push(error);
          }
        });
        value = field.value;
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
          const validators = getTextFieldSchemaValidators(field);

          validators.forEach(({ validator, error }) => {
            const valid = validator.isValidSync(field.value);
            if (!valid) {
              errors.push(error);
            }
          });

          value = field.value || ""; // falling back to empty string because if value is undefined the field value is not updated.
          break;
        }
        case "select": {
          const validators = getSelectSchemaValidators(field);

          validators.forEach(({ validator, error }) => {
            const valid = validator.isValidSync(field.value);
            if (!valid) {
              errors.push(error);
            }
          });

          value = field.value;
          break;
        }
        case "radio": {
          const validators = getRadioSchemaValidators(field);
          validators.forEach(({ validator, error }) => {
            const valid = validator.isValidSync(field.value);
            if (!valid) {
              errors.push(error);
            }
          });
          value = field.value;
          break;
        }
      }

      return { field, value, errors };
    });

    dispatch(formsSlice.actions.updateForm({ index, fields }));
  };

export const updateFormFieldValue =
  (index: number, fieldIndex: number, field: FormField) =>
  async (dispatch: AppDispatch) => {
    const errors: string[] = [];
    if (field.type === "text") {
      const validators = getTextFieldSchemaValidators(field);

      validators.forEach(({ validator, error }) => {
        const valid = validator.isValidSync(field.value);
        if (!valid) {
          errors.push(error);
        }
      });
    } else if (field.type === "select") {
      const validators = getSelectSchemaValidators(field);

      validators.forEach(({ validator, error }) => {
        const valid = validator.isValidSync(field.value);
        if (!valid) {
          errors.push(error);
        }
      });
    } else if (field.type === "radio") {
      const validators = getRadioSchemaValidators(field);
      validators.forEach(({ validator, error }) => {
        const valid = validator.isValidSync(field.value);
        if (!valid) {
          errors.push(error);
        }
      });
    }

    dispatch(
      formsSlice.actions.updateFormFieldValue({
        index,
        fieldIndex,
        field,
        errors,
      })
    );
  };

export const deleteForm = (index: number) => (dispatch: AppDispatch) => {
  dispatch(formsSlice.actions.deleteForm(index));
};
