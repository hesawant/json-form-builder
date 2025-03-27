import { FormField } from "src/types";

export const formData: FormField[] = [
  {
    name: "username",
    type: "text",
    label: "Username",
    required: true,
    value: "hesawant",
    validationRules: [
      {
        type: "max",
        value: 10,
        error: "Username must be less than 10 characters",
      },
      {
        type: "min",
        value: 3,
        error: "Username must be at least 3 characters",
      },
    ],
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    required: false,
    validationRules: [
      {
        type: "pattern",
        value: "^[^s@]+@[^s@]+\\.[^s@]+$",
        error: "Invalid email address",
      },
    ],
  },
  {
    type: "checkbox",
    name: "is_admin",
    label: "Is admin",
    value: false,
  },
  {
    type: "select",
    name: "role",
    label: "Role",
    required: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Guest", value: "guest" },
    ],
    value: "guest",
  },
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
            {
              label: "Transgender",
              value: "transgender",
              nested: {
                type: "radio",
                label: "Prefer not to say",
                name: "prefer-not-to-say",
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                  { label: "Maybe", value: "maybe" },
                ],
              },
            },
            { label: "Non-binary", value: "non-binary" },
            { label: "Prefer not to say", value: "prefer-not-to-say" },
          ],
        },
      },
    ],
    // value: "female",
  },
];
