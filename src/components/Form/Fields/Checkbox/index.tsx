import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

import { CheckboxSchema } from "src/types";

type Props = {
  field: CheckboxSchema;
  onChange: (field: CheckboxSchema) => void;
};

const Checkbox = ({ field, onChange }: Props) => {
  const { label, required, name } = field;

  return (
    <FormControlLabel
      required={required}
      control={
        <MuiCheckbox
          name={name}
          checked={field.value || false}
          onChange={(e) => onChange({ ...field, value: e.target.checked })}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
