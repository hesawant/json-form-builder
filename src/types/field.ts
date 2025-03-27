export enum FieldType {
  CHECKBOX = "checkbox",
  DATE = "date",
  EMAIL = "email",
  RADIO = "radio",
  SELECT = "select",
  TEXT = "text",
}

export type FieldDependency = {
  fieldName: string; // The field that this one depends on
  value?: string | boolean; // if dependent field has "value" or true, then this field will be shown
};
