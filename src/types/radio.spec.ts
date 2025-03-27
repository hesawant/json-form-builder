import { getRadioSchemaValidators } from "./radio";
import { FieldType } from "./field";

describe("RadioSchema", () => {
  it("should return the 2 validators, required and oneOf", () => {
    const validators = getRadioSchemaValidators({
      type: FieldType.RADIO,
      name: "gender",
      label: "Gender",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      value: "female",
    });

    expect(validators).toHaveLength(2);

    expect(validators[0].error).toBe("Gender is required");
    expect(validators[1].error).toBe(
      "Gender must be one of: Male, Female, Other"
    );
  });

  it("should return the 1 validator for oneOf", () => {
    const validators = getRadioSchemaValidators({
      type: FieldType.RADIO,
      name: "gender",
      label: "Gender",
      required: false,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      value: "female",
    });

    expect(validators).toHaveLength(1);
    expect(validators[0].error).toBe(
      "Gender must be one of: Male, Female, Other"
    );
  });
});
