import {
  FieldType,
  FormField,
  getCheckboxSchemaValidators,
  getEmailSchemaValidators,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
} from "src/types";
import { FormFieldState } from "../slices";

export const getFormFieldsWithErrors = (form: FormField[]) => {
  const formFields: FormFieldState[] = form.map((field) => {
    let value: string | boolean | undefined;
    const errors: string[] = [];

    switch (field.type) {
      case FieldType.TEXT: {
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
      case FieldType.SELECT: {
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
      case FieldType.RADIO: {
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
      case FieldType.CHECKBOX: {
        const validators = getCheckboxSchemaValidators(field);
        validators.forEach(({ validator, error }) => {
          const valid = validator.isValidSync(field.value);
          if (!valid) {
            errors.push(error);
          }
        });

        value = field.value;
        break;
      }
      case FieldType.EMAIL: {
        const validators = getEmailSchemaValidators(field);
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

  return formFields;
};
