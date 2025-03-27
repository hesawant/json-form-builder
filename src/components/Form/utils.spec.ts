import { formData } from "src/data/form";

import { FieldType, FormField } from "src/types";
import { getFormData } from "./utils";

describe("getFormData", () => {
  test("should return the form data", () => {
    const result = getFormData(formData);

    expect(result).toEqual({
      email: undefined,
      gender: "",
      is_admin: false,
      role: "guest",
      username: "hesawant",
      birthday: "2025-01-15",
    });
  });

  test("should return the form data with radio value", () => {
    const formFields: FormField[] = [
      {
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
    ];
    const result = getFormData(formFields);

    expect(result).toEqual({ gender: "transgender" });
  });
});
