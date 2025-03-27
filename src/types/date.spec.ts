import { getDateSchemaValidators } from "./date";
import { FieldType } from "./field";

describe("DateSchema", () => {
  it("should return the 2 validators, required and datetime", () => {
    const validators = getDateSchemaValidators({
      type: FieldType.DATE,
      name: "birthday",
      label: "Birthday",
      value: "2025-01-01",
      required: true,
    });

    expect(validators).toHaveLength(2);

    expect(validators[0].error).toBe("Birthday is required");
    expect(validators[1].error).toBe("Birthday is not a valid date");
  });
});
