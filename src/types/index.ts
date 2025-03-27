import { CheckboxSchema, getCheckboxSchemaValidators } from "./checkbox";
import { EmailSchema, getEmailSchemaValidators } from "./email";
import { RadioOption, RadioSchema, getRadioSchemaValidators } from "./radio";
import { SelectSchema, getSelectSchemaValidators } from "./select";
import { TextFieldSchema, getTextFieldSchemaValidators } from "./text-field";
import { FieldType } from "./field";

export { FieldType };

export type {
  CheckboxSchema,
  EmailSchema,
  RadioOption,
  RadioSchema,
  SelectSchema,
  TextFieldSchema,
};

export type FormField =
  | CheckboxSchema
  | EmailSchema
  | RadioSchema
  | SelectSchema
  | TextFieldSchema;

export {
  getCheckboxSchemaValidators,
  getEmailSchemaValidators,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
};
