import { Box, Stack } from "@mui/material";
import { FormState, FormFieldState } from "src/store/slices";

import { useDispatch } from "src/store";
import { updateFormFieldValue } from "src/store/actions";

import TextField from "./Fields/TextField";
import Checkbox from "./Fields/Checkbox";
import Select from "./Fields/Select";

type Props = {
  index: number;
  form: FormState;
};

const Form = ({ index, form }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (fieldIndex: number, value: FormFieldState["value"]) => {
    dispatch(updateFormFieldValue(index, fieldIndex, value));
  };

  return (
    <Stack gap={2} padding={2}>
      {form.fields.map((field, i) => {
        if (field.field.type === "text") {
          return (
            <TextField
              key={i}
              field={field.field}
              value={field.value as string}
              errors={field.errors}
              onChange={(value) => handleChange(i, value)}
            />
          );
        }

        if (field.field.type === "checkbox") {
          return (
            <Checkbox
              key={i}
              field={field.field}
              value={Boolean(field.value)}
              onChange={(value) => handleChange(i, value)}
            />
          );
        }

        if (field.field.type === "select") {
          return (
            <Select
              key={i}
              field={field.field}
              value={field.value as string}
              errors={field.errors}
              onChange={(value) => handleChange(i, value)}
            />
          );
        }

        return (
          <Box key={i}>
            {field.field.type} - {field.field.name}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Form;
