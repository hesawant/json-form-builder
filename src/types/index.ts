import { CheckboxSchema, getCheckboxSchemaValidators } from "./checkbox";
import { RadioOption, RadioSchema, getRadioSchemaValidators } from "./radio";
import { SelectSchema, getSelectSchemaValidators } from "./select";
import { TextFieldSchema, getTextFieldSchemaValidators } from "./text-field";
import { FieldType } from "./field";

export { FieldType };

export type {
  CheckboxSchema,
  RadioOption,
  RadioSchema,
  SelectSchema,
  TextFieldSchema,
};

export type FormField =
  | CheckboxSchema
  | RadioSchema
  | SelectSchema
  | TextFieldSchema;

export {
  getCheckboxSchemaValidators,
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
};
