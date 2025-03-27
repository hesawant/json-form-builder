import * as yup from "yup";
import { Validator } from "./validation-rules";

export type RadioOption = {
  label: string;
  value: string;
  nested?: RadioSchema;
};

export type RadioSchema = {
  type: "radio";
  name: string;
  label: string;
  required?: boolean;
  options: RadioOption[];
  value?: string;
};

export const getRadioSchemaValidators = (field: RadioSchema) => {
  const validators: Validator[] = [];

  if (field.required) {
    validators.push({
      validator: yup.string().required(),
      error: `${field.label} is required`,
    });
  }

  if (field.options.length) {
    validators.push({
      validator: yup.string().oneOf(field.options.map((o) => o.value)),
      error: `${field.label} is required`,
    });
  }

  return validators;
};
