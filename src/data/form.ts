import { FormSchema } from "src/types";

export const formData: FormSchema = [
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
];
