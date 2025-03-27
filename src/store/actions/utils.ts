import {
  FormField,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
} from "src/types";
import { FormFieldState } from "../slices";

export const getFormFieldsWithErrors = (form: FormField[]) => {
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

  return formFields;
};
