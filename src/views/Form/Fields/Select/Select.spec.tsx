import { render, fireEvent } from "@testing-library/react";

import Select from "./index";

describe("Select", () => {
  test("renders Select", async () => {
    const mockOnChange = jest.fn();

    const { getByText } = render(
      <Select
        field={{
          type: "select",
          name: "role",
          label: "Role",
          required: true,
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Guest", value: "guest" },
          ],
          value: "guest",
        }}
        errors={[]}
        onChange={mockOnChange}
      />
    );

    expect(getByText("Role")).toBeInTheDocument();
    expect(getByText("Guest")).toBeInTheDocument();

    fireEvent.mouseDown(getByText("Guest"));
    fireEvent.click(getByText("Admin"));

    expect(mockOnChange).toHaveBeenCalledWith({
      type: "select",
      name: "role",
      label: "Role",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ],
      value: "admin",
    });
  });
});
