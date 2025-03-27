import { FieldType } from "src/types";
import store from "src/store";
import { addForm, updateForm, updateFormFieldValue, deleteForm } from "./index";

describe("actions", () => {
  test("should add a form", () => {
    store.dispatch(
      addForm([
        {
          name: "username",
          type: FieldType.TEXT,
          label: "Username",
          required: true,
          value: "username",
          validationRules: [
            {
              type: "max",
              value: 10,
              error: "Username must be less than 10 characters",
            },
            {
              type: "min",
              value: 3,
              error: "Username must be at least 3 characters",
            },
          ],
        },
      ])
    );

    const state = store.getState();
    expect(state.forms.forms).toHaveLength(1);
    expect(state.forms.forms[0].fields[0].errors).toHaveLength(0);
  });

  test("should update a form", () => {
    store.dispatch(
      updateForm(0, [
        {
          name: "username",
          type: FieldType.TEXT,
          label: "Username",
          required: true,
          value: "long-username",
          validationRules: [
            {
              type: "max",
              value: 10,
              error: "Username must be less than 10 characters",
            },
            {
              type: "min",
              value: 3,
              error: "Username must be at least 3 characters",
            },
          ],
        },
      ])
    );

    const state = store.getState();
    expect(state.forms.forms).toHaveLength(1);
    expect(state.forms.forms[0].fields[0].errors).toHaveLength(1);
  });

  test("should update a form field value", () => {
    store.dispatch(
      updateFormFieldValue(0, 0, {
        name: "username",
        type: FieldType.TEXT,
        label: "Username",
        required: false,
        value: "username",
      })
    );

    const state = store.getState();
    expect(state.forms.forms).toHaveLength(1);
    expect(state.forms.forms[0].fields[0].errors).toHaveLength(0);
  });

  test("should delete a form", () => {
    store.dispatch(deleteForm(0));

    const state = store.getState();
    expect(state.forms.forms).toHaveLength(0);
  });
});
