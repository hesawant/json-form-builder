import { FormState } from "src/store/slices";
import { FieldType, FormField } from "src/types";

// Since radio buttons can have nested radio buttons, we need to handle them recursively.
// This function will return the value of the radio button that is selected.
const getNestedRadioValue = (field: FormField): string => {
  if (field.type !== FieldType.RADIO) return "";

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
    if (field.type === FieldType.RADIO) {
      data[field.name] = getNestedRadioValue(field);
    } else {
      data[field.name] = field.value;
    }
  });

  return data;
};

export const isFieldVisible = (form: FormState, field: FormField): boolean => {
  if (!field.dependencies?.length) return true;

  return field.dependencies.every((dependency) => {
    const dependentField = form.fields.find(
      (f) => f.field.name === dependency.fieldName
    );

    if (typeof dependency.value === "boolean") {
      return Boolean(dependentField?.field.value);
    }

    return dependentField?.field.value === dependency.value;
  });
};
