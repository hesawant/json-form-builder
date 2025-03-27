import { formData } from "src/data/form";

import { FieldType, FormField } from "src/types";
import { getFormData, isFieldVisible } from "./utils";
import { FormState } from "src/store/slices";

describe("getFormData", () => {
  test("should return the form data", () => {
    const result = getFormData({
      fields: formData.map((field) => ({ field, errors: [] })),
    });

    expect(result).toEqual({
      email: undefined,
      gender: "",
      is_admin: false,
      username: "hesawant",
      // Below 2 fields are not visible due to dependencies
      // role: "guest",
      // birthday: "2025-01-15",
    });
  });

  test("should return the form data with radio value", () => {
    const formFields: FormState = {
      fields: [
        {
          field: {
            type: FieldType.RADIO,
            name: "gender",
            label: "Gender",
            required: true,
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              {
                label: "Other",
                value: "other",
                nested: {
                  type: FieldType.RADIO,
                  label: "Other",
                  name: "other",
                  options: [
                    { label: "Transgender", value: "transgender" },
                    { label: "Non-binary", value: "non-binary" },
                    { label: "Prefer not to say", value: "prefer-not-to-say" },
                  ],
                  value: "transgender",
                },
              },
            ],
            value: "other",
          },
          errors: [],
        },
      ],
    };
    const result = getFormData(formFields);

    expect(result).toEqual({ gender: "transgender" });
  });
});

const checkboxField: FormField = {
  type: FieldType.CHECKBOX,
  name: "is_admin",
  label: "Is admin",
  value: true,
  required: true,
};

const selectField: FormField = {
  type: FieldType.SELECT,
  name: "gender",
  label: "Gender",
  required: true,
  value: "male",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
  dependencies: [{ fieldName: "is_admin", value: true }],
};

describe("isFieldVisible", () => {
  test("should return true if the field is visible", () => {
    const result = isFieldVisible(
      {
        fields: [
          { field: checkboxField, errors: [] },
          { field: selectField, errors: [] },
        ],
      },
      selectField
    );

    expect(result).toBe(true);
  });

  test("should return true if the field is visible", () => {
    const result = isFieldVisible(
      {
        fields: [
          { field: { ...checkboxField, value: false }, errors: [] },
          { field: selectField, errors: [] },
        ],
      },
      selectField
    );

    expect(result).toBe(false);
  });
});
