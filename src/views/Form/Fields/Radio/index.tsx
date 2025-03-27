import { FormControl, FormLabel } from "@mui/material";

import { RadioSchema } from "src/types";

import RadioGroup from "./RadioGroup";

type Props = {
  field: RadioSchema;
  errors: string[];
  onChange: (field: RadioSchema) => void;
};

const Radio = ({ field, errors, onChange }: Props) => {
  return (
    <FormControl error={errors.length > 0}>
      <FormLabel required={field.required} sx={{ textAlign: "start" }}>
        {field.label}
      </FormLabel>
      <RadioGroup field={field} onChange={onChange} />
    </FormControl>
  );
};

export default Radio;
