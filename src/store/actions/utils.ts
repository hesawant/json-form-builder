import {
  FieldType,
  FormField,
  getCheckboxSchemaValidators,
  getDateSchemaValidators,
  getEmailSchemaValidators,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
} from "src/types";
import { FormFieldState } from "../slices";
import { Validator } from "src/types/validation-rules";

export const getFormFieldsWithErrors = (form: FormField[]) => {
  const formFields: FormFieldState[] = form.map((field) => {
    let value: string | boolean | undefined = field.value;
    let validators: Validator[] = [];

    switch (field.type) {
      case FieldType.TEXT: {
        validators = getTextFieldSchemaValidators(field);
        value = field.value || "";
        break;
      }
      case FieldType.SELECT: {
        validators = getSelectSchemaValidators(field);
        break;
      }
      case FieldType.RADIO: {
        validators = getRadioSchemaValidators(field);
        break;
      }
      case FieldType.CHECKBOX: {
        validators = getCheckboxSchemaValidators(field);
        break;
      }
      case FieldType.EMAIL: {
        validators = getEmailSchemaValidators(field);
        value = field.value || "";
        break;
      }
      case FieldType.DATE: {
        validators = getDateSchemaValidators(field);
        value = field.value || "";
        break;
      }
    }

    const errors: string[] = [];
    validators.forEach(({ validator, error }) => {
      const valid = validator.isValidSync(field.value);
      if (!valid) {
        errors.push(error);
      }
    });

    return { field, value, errors };
  });

  return formFields;
};
