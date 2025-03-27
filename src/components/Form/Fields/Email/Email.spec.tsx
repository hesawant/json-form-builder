import { render, fireEvent } from "@testing-library/react";

import { FieldType } from "src/types";
import Email from "./index";

describe("Email", () => {
  test("renders Email field", () => {
    const mockOnChange = jest.fn();

    const { getByRole, getByText } = render(
      <Email
        field={{
          type: FieldType.EMAIL,
          label: "Email",
          name: "email",
          required: true,
          value: "invalid-email",
        }}
        errors={["Email is not valid email"]}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Email is not valid email")).toBeInTheDocument();

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      type: FieldType.EMAIL,
      label: "Email",
      name: "email",
      required: true,
      value: "test@test.com",
    });
  });
});
