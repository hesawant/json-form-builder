import { render, fireEvent } from "@testing-library/react";

import { FieldType } from "src/types";
import TextField from "./index";

describe("TextField", () => {
  test("renders TextField", () => {
    const mockOnChange = jest.fn();

    const { getByRole, getByText } = render(
      <TextField
        field={{
          type: FieldType.TEXT,
          label: "Email",
          name: "email",
          required: true,
        }}
        errors={["Email field is required"]}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Email field is required")).toBeInTheDocument();

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      type: FieldType.TEXT,
      label: "Email",
      name: "email",
      required: true,
      value: "test@test.com",
    });
  });
});
