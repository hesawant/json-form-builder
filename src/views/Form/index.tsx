import { Button, Stack } from "@mui/material";
import { FormState } from "src/store/slices";

import { useDispatch } from "src/store";
import { updateFormFieldValue } from "src/store/actions";

import TextField from "./Fields/TextField";
import Checkbox from "./Fields/Checkbox";
import Radio from "./Fields/Radio";
import Select from "./Fields/Select";
import { FormField } from "src/types";

import { getFormData } from "./utils";

type Props = {
  index: number;
  form: FormState;
};

const Form = ({ index, form }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (fieldIndex: number, value: FormField) => {
    dispatch(updateFormFieldValue(index, fieldIndex, value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errors = form.fields
      .map(({ errors }) => {
        return errors;
      })
      .flat();

    if (errors.length) {
      alert(JSON.stringify(errors, null, 4));
    } else {
      console.log(getFormData(form.fields.map(({ field }) => field)));
      alert("Form submitted successfully");
    }
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2} padding={2}>
        {form.fields.map((field, i) => {
          if (field.field.type === "text") {
            return (
              <TextField
                key={i}
                field={field.field}
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
                onChange={(value) => handleChange(i, value)}
              />
            );
          }

          if (field.field.type === "radio") {
            return (
              <Radio
                key={i}
                field={field.field}
                errors={field.errors}
                onChange={(value) => handleChange(i, value)}
              />
            );
          }

          if (field.field.type === "select") {
            return (
              <Select
                key={i}
                field={field.field}
                errors={field.errors}
                onChange={(value) => handleChange(i, value)}
              />
            );
          }

          return null;
        })}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
