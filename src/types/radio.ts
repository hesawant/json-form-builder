import * as yup from "yup";
import { Validator } from "./validation-rules";
import { FieldDependency, FieldType } from "./field";

export type RadioOption = {
  label: string;
  value: string;
  nested?: RadioSchema;
};

export type RadioSchema = {
  type: FieldType.RADIO;
  name: string;
  label: string;
  required?: boolean;
  options: RadioOption[];
  value?: string;
  dependencies?: FieldDependency[];
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
      error: `${field.label} must be one of: ${field.options
        .map((o) => o.label)
        .join(", ")}`,
    });
  }

  return validators;
};
