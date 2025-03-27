import { render, fireEvent } from "@testing-library/react";

import RadioGroup from "./RadioGroup";

describe("RadioGroup", () => {
  test("Renders RadioGroup", async () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <RadioGroup
        field={{
          type: "radio",
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
        onChange={mockOnChange}
      />
    );

    // expect(getByText("Gender")).toBeInTheDocument();
    expect(getByText("Male")).toBeInTheDocument();
    expect(getByText("Female")).toBeInTheDocument();
    expect(getByText("Other")).toBeInTheDocument();

    fireEvent.click(getByText("Male"));

    expect(mockOnChange).toHaveBeenCalledWith({
      type: "radio",
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
