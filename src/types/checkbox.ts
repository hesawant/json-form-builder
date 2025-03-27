import * as yup from "yup";

import { FieldDependency, FieldType } from "./field";
import { Validator } from "./validation-rules";

export type CheckboxSchema = {
  type: FieldType.CHECKBOX;
  name: string;
  label: string;
  required?: boolean;
  value?: boolean;
  dependencies?: FieldDependency[];
};

export const getCheckboxSchemaValidators = (
  checkboxSchema: CheckboxSchema
): Validator[] => {
  const validators: Validator[] = [];

  if (checkboxSchema.required) {
    validators.push({
      validator: yup.boolean().required("Required"),
      error: `${checkboxSchema.label} is required`,
    });
  }

  return validators;
};
