import { render, fireEvent } from "@testing-library/react";

import { FieldType } from "src/types";
import Checkbox from "./index";

describe("Checkbox", () => {
  test("Renders Checkbox", async () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <Checkbox
        field={{
          type: FieldType.CHECKBOX,
          name: "is_admin",
          label: "Is admin",
          value: false,
        }}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Is admin")).toBeInTheDocument();

    fireEvent.click(getByText("Is admin"));

    expect(mockOnChange).toHaveBeenCalledWith({
      type: FieldType.CHECKBOX,
      name: "is_admin",
      label: "Is admin",
      value: true,
    });
  });
});
