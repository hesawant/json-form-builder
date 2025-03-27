import * as yup from "yup";

import { FieldDependency, FieldType } from "./field";
import { Validator } from "./validation-rules";

export type EmailSchema = {
  type: FieldType.EMAIL;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  dependencies?: FieldDependency[];
};

export const getEmailSchemaValidators = (emailSchema: EmailSchema) => {
  const validators: Validator[] = [];

  if (emailSchema.required) {
    validators.push({
      validator: yup.string().email(),
      error: `${emailSchema.label} is required`,
    });
  }

  validators.push({
    validator: yup.string().email(),
    error: `Email is not valid`,
  });

  return validators;
};
