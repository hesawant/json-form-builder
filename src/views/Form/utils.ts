import { FormField } from "src/types";

// Since radio buttons can have nested radio buttons, we need to handle them recursively.
// This function will return the value of the radio button that is selected.
const getNestedRadioValue = (field: FormField): string => {
  if (field.type !== "radio") return "";

  if (field.options.length) {
    const nestedField = field.options.find(
      (option) => option.value === field.value
    );

    if (nestedField?.nested) {
      return getNestedRadioValue(nestedField.nested);
    }
  }

  return field.value || "";
};

export const getFormData = (fields: FormField[]) => {
  const data: { [key: string]: unknown } = {};

  fields.forEach((field) => {
    if (field.type === "radio") {
      data[field.name] = getNestedRadioValue(field);
    } else {
      data[field.name] = field.value;
    }
  });

  return data;
};
