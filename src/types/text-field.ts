import * as yup from "yup";

export type TextFieldSchema = {
  type: "text";
  name: string;
  label: string;
  numberOfLines?: number;
  placeholder?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  validation?: RegExp;
};

export const getTextFieldSchemaValidator = (textField: TextFieldSchema) => {
  let textFieldSchema = yup.string();

  if (textField.required) {
    textFieldSchema = textFieldSchema.required();
  }

  if (textField.validation) {
    textFieldSchema = textFieldSchema.matches(textField.validation);
  }

  if (textField.minLength) {
    textFieldSchema = textFieldSchema.min(textField.minLength);
  }

  if (textField.maxLength) {
    textFieldSchema = textFieldSchema.max(textField.maxLength);
  }

  return textFieldSchema;
};
