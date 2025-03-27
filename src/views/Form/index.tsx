import { Box, Stack } from "@mui/material";
import { FormState } from "src/store/slices";

import { useDispatch } from "src/store";
import { updateFormFieldValue } from "src/store/actions";

import TextField from "./Fields/TextField";

type Props = {
  index: number;
  form: FormState;
};

const Form = ({ index, form }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (fieldIndex: number, value: string) => {
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
              value={field.value}
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
