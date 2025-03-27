import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Divider, Stack } from "@mui/material";

import store from "src/store";
import { useDispatch } from "src/store";
import { addForm } from "src/store/actions";
import { formData as formJson } from "src/data/form";

import FormDetails from "src/views/FormDetails";
import FormList from "src/views/FormList";

import "./App.css";

const BaseApp = () => {
  const dispatch = useDispatch();

  const [formIndex, setFormIndex] = useState(0);

  useEffect(() => {
    dispatch(addForm(formJson));
  }, [dispatch]);

  return (
    <Stack direction="row" width="100%" height="100%">
      <FormList selectedIndex={formIndex} onClick={setFormIndex} />
      <Divider orientation="vertical" flexItem />
      <FormDetails index={formIndex} onDelete={() => setFormIndex(0)} />
    </Stack>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BaseApp />
    </Provider>
  );
};

export default App;
