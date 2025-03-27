import { render, fireEvent } from "@testing-library/react";

import { Provider } from "react-redux";
import store from "src/store";
import { addForm } from "src/store/actions";

import { formData } from "src/data/form";

import FormList from "./index";

describe("FormList", () => {
  beforeAll(() => {
    store.dispatch(addForm(formData));
  });

  test("Renders FormList", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <FormList selectedIndex={0} onClick={() => {}} />
      </Provider>
    );

    expect(getByText("Add new form")).toBeInTheDocument();
    expect(getByText("Form 1")).toBeInTheDocument();
    expect(queryByText("Form 2")).not.toBeInTheDocument();
  });

  test("Click on the form list item", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <FormList selectedIndex={0} onClick={mockOnClick} />
      </Provider>
    );

    const formItem = getByText("Form 1");
    fireEvent.click(formItem);

    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  test("Click on the add new form button", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <FormList selectedIndex={0} onClick={() => {}} />
      </Provider>
    );

    const addNewFormButton = getByText("Add new form");
    fireEvent.click(addNewFormButton);

    expect(getByTestId("json-input-dialog")).toBeInTheDocument();

    const saveButton = getByTestId("json-input-dialog-save-button");
    fireEvent.click(saveButton);

    expect(store.getState().forms.forms.length).toBe(2);
  });
});
