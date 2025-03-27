import { getCheckboxSchemaValidators } from "./checkbox";
import { FieldType } from "./field";

describe("CheckboxSchema", () => {
  it("should return the 2 validators, required and oneOf", () => {
    const validators = getCheckboxSchemaValidators({
      type: FieldType.CHECKBOX,
      name: "is_admin",
      label: "Is admin",
      value: false,
      required: true,
    });

    expect(validators).toHaveLength(1);

    expect(validators[0].error).toBe("Is admin is required");
  });
});
