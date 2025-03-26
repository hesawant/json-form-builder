import { CheckboxSchema } from "./checkbox";
import { RadioSchema } from "./radio";
import { SelectSchema } from "./select";
import { TextFieldSchema, getTextFieldSchemaValidator } from "./text-field";

export type { CheckboxSchema, RadioSchema, SelectSchema, TextFieldSchema };

export type FormField =
  | CheckboxSchema
  | RadioSchema
  | SelectSchema
  | TextFieldSchema;

export type FormSchema = FormField[];

export { getTextFieldSchemaValidator };
