import { getTextFieldSchemaValidators } from "./text-field";

describe("TextFieldSchema", () => {
  it("should return the 3 validators, required and oneOf", () => {
    const validators = getTextFieldSchemaValidators({
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
        {
          type: "pattern",
          value: "^[a-zA-Z0-9]+$",
          error: "Username must contain only letters and numbers",
        },
      ],
    });

    expect(validators).toHaveLength(4);

    expect(validators[0].error).toBe("Username is required");
    expect(validators[1].error).toBe(
      "Username must be less than 10 characters"
    );
    expect(validators[2].error).toBe("Username must be at least 3 characters");
    expect(validators[3].error).toBe(
      "Username must contain only letters and numbers"
    );
  });
});
