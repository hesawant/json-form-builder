import { CheckboxSchema, getCheckboxSchemaValidators } from "./checkbox";
import { DateSchema, getDateSchemaValidators } from "./date";
import { EmailSchema, getEmailSchemaValidators } from "./email";
import { RadioOption, RadioSchema, getRadioSchemaValidators } from "./radio";
import { SelectSchema, getSelectSchemaValidators } from "./select";
import { TextFieldSchema, getTextFieldSchemaValidators } from "./text-field";
import { FieldType } from "./field";

export { FieldType };

export type {
  CheckboxSchema,
  DateSchema,
  EmailSchema,
  RadioOption,
  RadioSchema,
  SelectSchema,
  TextFieldSchema,
};

export type FormField =
  | CheckboxSchema
  | DateSchema
  | EmailSchema
  | RadioSchema
  | SelectSchema
  | TextFieldSchema;

export {
  getCheckboxSchemaValidators,
  getDateSchemaValidators,
  getEmailSchemaValidators,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
};
