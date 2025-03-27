import { Button, Stack } from "@mui/material";
import { FormState } from "src/store/slices";

import TextField from "./Fields/TextField";
import Checkbox from "./Fields/Checkbox";
import Radio from "./Fields/Radio";
import Select from "./Fields/Select";
import { FieldType, FormField } from "src/types";

import { getFormData } from "./utils";
import Email from "./Fields/Email";
import Date from "./Fields/Date";

type Props = {
  form: FormState;
  onChange: (fieldIndex: number, value: FormField) => void;
};

const Form = ({ form, onChange }: Props) => {
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
        {form.fields.map(({ field, errors }, i) => {
          if (field.type === FieldType.TEXT) {
            return (
              <TextField
                key={i}
                field={field}
                errors={errors}
                onChange={(value) => onChange(i, value)}
              />
            );
          }

          if (field.type === FieldType.EMAIL) {
            return (
              <Email
                key={i}
                field={field}
                errors={errors}
                onChange={(value) => onChange(i, value)}
              />
            );
          }

          if (field.type === FieldType.CHECKBOX) {
            return (
              <Checkbox
                key={i}
                field={field}
                onChange={(value) => onChange(i, value)}
              />
            );
          }

          if (field.type === FieldType.RADIO) {
            return (
              <Radio
                key={i}
                field={field}
                errors={errors}
                onChange={(value) => onChange(i, value)}
              />
            );
          }

          if (field.type === FieldType.SELECT) {
            return (
              <Select
                key={i}
                field={field}
                errors={errors}
                onChange={(value) => onChange(i, value)}
              />
            );
          }

          if (field.type === FieldType.DATE) {
            return (
              <Date
                key={i}
                field={field}
                errors={errors}
                onChange={(value) => onChange(i, value)}
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
