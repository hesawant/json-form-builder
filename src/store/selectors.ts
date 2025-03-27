import { RootState } from ".";

export const getForms = (state: RootState) => state.forms.forms;

export const getFormByIndex = (state: RootState, index: number) =>
  state.forms.forms[index];
