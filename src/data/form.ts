import { FieldType, FormField } from "src/types";

export const formData: FormField[] = [
  {
    name: "username",
    type: FieldType.TEXT,
    label: "Username",
    required: true,
    value: "hesawant",
    placeholder: "Enter your username",
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
    type: FieldType.EMAIL,
    label: "Email",
    required: false,
    placeholder: "Add an email",
  },
  {
    type: FieldType.CHECKBOX,
    name: "is_admin",
    label: "Is admin",
    value: false,
    required: true,
  },
  {
    type: FieldType.SELECT,
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
            {
              label: "Transgender",
              value: "transgender",
              nested: {
                type: FieldType.RADIO,
                label: "Prefer not to say",
                name: "prefer-not-to-say",
                options: [
                  { label: "Yes", value: "transgender-yes" },
                  { label: "No", value: "transgender-no" },
                  { label: "Maybe", value: "transgender-maybe" },
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
