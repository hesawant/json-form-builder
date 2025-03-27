import { FieldType } from "src/types";
import { formData } from "src/data/form";
import { getFormFieldsWithErrors } from "./utils";

describe("getFormFieldsWithErrors", () => {
  it("should return the form fields with errors", () => {
    const formFields = getFormFieldsWithErrors(formData);

    expect(formFields).toHaveLength(5);

    formFields.forEach((field) => {
      expect(field.field).toBeDefined();
      expect(field.errors).toBeDefined();
    });
  });

  it("should return errors when text field validation fails", () => {
    const formFields = getFormFieldsWithErrors([
      {
        name: "username",
        type: FieldType.TEXT,
        label: "Username",
        required: true,
        value: "this is a long username",
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
    ]);

    expect(formFields).toHaveLength(1);
    expect(formFields[0].errors).toHaveLength(1);
    expect(formFields[0].errors[0]).toBe(
      "Username must be less than 10 characters"
    );
  });

  it("should return errors when select field validation fails", () => {
    const formFields = getFormFieldsWithErrors([
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
      },
    ]);

    expect(formFields).toHaveLength(1);
    expect(formFields[0].errors).toHaveLength(1);
    expect(formFields[0].errors[0]).toBe("Role is required");
  });

  it("should return errors when radio field validation fails", () => {
    const formFields = getFormFieldsWithErrors([
      {
        type: FieldType.RADIO,
        name: "gender",
        label: "Gender",
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
      },
    ]);

    expect(formFields).toHaveLength(1);
    expect(formFields[0].errors).toHaveLength(1);
    expect(formFields[0].errors[0]).toBe("Gender is required");
  });

  it("should return errors when checkbox field validation fails", () => {
    const formFields = getFormFieldsWithErrors([
      {
        type: FieldType.CHECKBOX,
        name: "is_admin",
        label: "Is admin",
        required: true,
      },
    ]);

    expect(formFields).toHaveLength(1);
    expect(formFields[0].errors).toHaveLength(1);
    expect(formFields[0].errors[0]).toBe("Is admin is required");
  });

  it("should return errors when email field validation fails", () => {
    const formFields = getFormFieldsWithErrors([
      {
        name: "email",
        type: FieldType.EMAIL,
        label: "Email",
        required: false,
        value: "invalid-email",
      },
    ]);

    expect(formFields).toHaveLength(1);
    expect(formFields[0].errors).toHaveLength(1);
    expect(formFields[0].errors[0]).toBe("Email is not valid");
  });
});
