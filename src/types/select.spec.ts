import { getSelectSchemaValidators } from "./select";

describe("SelectSchema", () => {
  it("should return the 2 validators, required and oneOf", () => {
    const validators = getSelectSchemaValidators({
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
    });

    expect(validators).toHaveLength(2);

    expect(validators[0].error).toBe("Role is required");
    expect(validators[1].error).toBe(
      "Role is not one of the available options"
    );
  });

  it("should return the 1 validator for oneOf", () => {
    const validators = getSelectSchemaValidators({
      type: "select",
      name: "role",
      label: "Role",
      required: false,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ],
      value: "guest",
    });

    expect(validators).toHaveLength(1);
    expect(validators[0].error).toBe(
      "Role is not one of the available options"
    );
  });
});
