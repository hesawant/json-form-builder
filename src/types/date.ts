import * as yup from "yup";

import { FieldType } from "./field";
import { Validator } from "./validation-rules";

export type DateSchema = {
  type: FieldType.DATE;
  name: string;
  label: string;
  placeholder?: string;
  min?: string;
  max?: string;
  value?: string;
  required?: boolean;
};

export const getDateSchemaValidators = (dateSchema: DateSchema) => {
  const validators: Validator[] = [];

  if (dateSchema.required) {
    validators.push({
      validator: yup.string().required(),
      error: `${dateSchema.label} is required`,
    });
  }

  if (dateSchema.value) {
    validators.push({
      validator: yup.date(),
      error: `${dateSchema.label} is not a valid date`,
    });
  }

  if (dateSchema.min) {
    validators.push({
      validator: yup.date().min(dateSchema.min),
      error: `${dateSchema.label} must be greater than ${dateSchema.min}`,
    });
  }

  if (dateSchema.max) {
    validators.push({
      validator: yup.date().max(dateSchema.max),
      error: `${dateSchema.label} must be less than ${dateSchema.max}`,
    });
  }

  return validators;
};
