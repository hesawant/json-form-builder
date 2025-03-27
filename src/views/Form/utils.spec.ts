import { formData } from "src/data/form";

import { FormField } from "src/types";
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
    });
  });

  test("should return the form data with radio value", () => {
    const formFields: FormField[] = [
      {
        type: "radio",
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
              type: "radio",
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
