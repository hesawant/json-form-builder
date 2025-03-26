import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  UseSelector,
} from "react-redux";
import { formsSlice } from "./slices";

const store = configureStore({
  reducer: {
    forms: formsSlice.reducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type useAppDispatch = () => AppDispatch;

export const useDispatch: useAppDispatch = useReduxDispatch;
export const useSelector: UseSelector<RootState> = useReduxSelector;
