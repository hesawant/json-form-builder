import { RootState } from ".";

import { FormField } from "src/types";

export const getForms = (state: RootState) => state.forms.forms;

export const getFormByIndex = (state: RootState, index: number) =>
  state.forms.forms[index];

export const getFormFieldByIndex = (
  state: RootState,
  index: number,
  fieldIndex: number
): FormField | undefined => state.forms.forms[index]?.fields[fieldIndex].field;

export const getFormFieldIsValidByIndex = (
  state: RootState,
  index: number,
  fieldIndex: number
): boolean | undefined => state.forms.forms[index]?.fields[fieldIndex].isValid;
