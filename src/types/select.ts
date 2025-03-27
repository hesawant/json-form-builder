import * as yup from "yup";
import { Validator } from "./validation-rules";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectSchema = {
  type: "select";
  name: string;
  label: string;
  options: SelectOption[];
  required?: boolean;
  value?: string;
};

export const getSelectSchemaValidators = (field: SelectSchema) => {
  const validators: Validator[] = [];

  if (field.required) {
    validators.push({
      validator: yup.string().required(),
      error: `${field.name} is required`,
    });
  }

  if (field.options.length) {
    validators.push({
      validator: yup
        .string()
        .oneOf(field.options.map((option) => option.value)),
      error: `${field.label} is not one of the options`,
    });
  }

  return validators;
};
