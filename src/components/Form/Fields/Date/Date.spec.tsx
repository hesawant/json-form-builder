import { render } from "@testing-library/react";

import { FieldType } from "src/types";
import TextField from "./index";

describe("TextField", () => {
  test("renders TextField", () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <TextField
        field={{
          type: FieldType.DATE,
          label: "Birthday",
          name: "birthday",
          required: true,
          min: "2025-01-01",
          max: "2025-01-31",
        }}
        errors={["Birthday field is required"]}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Birthday")).toBeInTheDocument();
    expect(getByText("Birthday field is required")).toBeInTheDocument();
  });
});
