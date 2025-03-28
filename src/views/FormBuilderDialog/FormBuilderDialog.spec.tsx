import { render, fireEvent } from "@testing-library/react";

import FormBuilderDialog from "./index";
import { FieldType } from "src/types";

describe("FormBuilderDialog", () => {
  test("renders FormBuilderDialog", () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    const { getByText, getByRole, getByTestId } = render(
      <FormBuilderDialog json={[]} onSave={mockOnSave} onClose={mockOnClose} />
    );

    // Check form closes
    const closeButton = getByTestId("json-input-dialog-close-button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();

    const saveButton = getByTestId("json-input-dialog-save-button");
    expect(saveButton).toBeInTheDocument();

    // If the entered json does not meet requirement show an error.
    fireEvent.click(saveButton);
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(
      getByText("Invalid JSON: Add atleast 1 form field")
    ).toBeInTheDocument();

    const input = getByRole("textbox");

    // Shows error if type is incorrect
    fireEvent.change(input, {
      target: {
        value: JSON.stringify([
          {
            name: "email",
            type: "invalid-type",
            label: "Email",
            required: false,
            placeholder: "Add an email",
          },
        ]),
      },
    });

    fireEvent.click(saveButton);
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(getByText("Invalid JSON: Invalid field type")).toBeInTheDocument();

    // Valid JSON results in onSave being called
    fireEvent.change(input, {
      target: {
        value: JSON.stringify([
          {
            name: "email",
            type: FieldType.EMAIL,
            label: "Email",
            required: false,
            placeholder: "Add an email",
          },
        ]),
      },
    });

    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledWith([
      {
        name: "email",
        type: FieldType.EMAIL,
        label: "Email",
        required: false,
        placeholder: "Add an email",
      },
    ]);
  });
});
