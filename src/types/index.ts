import { CheckboxSchema } from "./checkbox";
import { RadioOption, RadioSchema, getRadioSchemaValidators } from "./radio";
import { SelectSchema, getSelectSchemaValidators } from "./select";
import { TextFieldSchema, getTextFieldSchemaValidators } from "./text-field";

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

export type FormSchema = FormField[];

export {
  getRadioSchemaValidators,
  getSelectSchemaValidators,
  getTextFieldSchemaValidators,
};
