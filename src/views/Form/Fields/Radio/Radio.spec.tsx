import { render, fireEvent } from "@testing-library/react";

import Radio from "./index";

describe("Radio", () => {
  test("Renders Radio", async () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <Radio
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
