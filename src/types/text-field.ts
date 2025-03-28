import * as yup from "yup";

import { FieldDependency, FieldType } from "./field";
import {
  MaxLengthRule,
  MinLengthRule,
  PatternRule,
  Validator,
} from "./validation-rules";

export type TextFieldSchema = {
  type: FieldType.TEXT;
  name: string;
  label: string;
  numberOfLines?: number;
  placeholder?: string;
  required?: boolean;
  value?: string;
  validationRules?: (MaxLengthRule | MinLengthRule | PatternRule)[];
  dependencies?: FieldDependency[];
};

export const getTextFieldSchemaValidators = (textField: TextFieldSchema) => {
  const validators: Validator[] = [];

  if (textField.required) {
    validators.push({
      validator: yup.string().required(),
      error: `${textField.label} is required`,
    });
  }

  textField.validationRules?.forEach((rule) => {
    switch (rule.type) {
      case "max": {
        validators.push({
          validator: yup.string().max(rule.value),
          error: rule.error || `Max length is ${rule.value}`,
        });
        break;
      }
      case "min": {
        validators.push({
          validator: yup.string().min(rule.value),
          error: rule.error || `Min length is ${rule.value}`,
        });
        break;
      }
      case "pattern": {
        if (textField.value) {
          validators.push({
            validator: yup.string().matches(new RegExp(rule.value)),
            error: rule.error || `Invalid ${textField.label}`,
          });
        }
        break;
      }
    }
  });

  return validators;
};
