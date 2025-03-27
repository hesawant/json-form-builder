import { render, fireEvent } from "@testing-library/react";
import { FieldType } from "src/types";

import Radio from "./index";

describe("Radio", () => {
  test("Renders Radio", async () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <Radio
        field={{
          type: FieldType.RADIO,
          name: "gender",
          label: "Gender",
          value: "female",
          required: true,
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ],
        }}
        errors={[]}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Gender")).toBeInTheDocument();
    expect(getByText("Male")).toBeInTheDocument();
    expect(getByText("Female")).toBeInTheDocument();
    expect(getByText("Other")).toBeInTheDocument();

    fireEvent.click(getByText("Male"));

    expect(mockOnChange).toHaveBeenCalledWith({
      type: FieldType.RADIO,
      name: "gender",
      label: "Gender",
      value: "male",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    });
  });
});
