import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

import { CheckboxSchema } from "src/types";

type Props = {
  field: CheckboxSchema;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = ({ field, value, onChange }: Props) => {
  const { label, name } = field;

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          name={name}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
