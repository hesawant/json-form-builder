import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

import { CheckboxSchema } from "src/types";

type Props = {
  field: CheckboxSchema;
  onChange: (field: CheckboxSchema) => void;
};

const Checkbox = ({ field, onChange }: Props) => {
  const { label, name } = field;

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          name={name}
          checked={field.value}
          onChange={(e) => onChange({ ...field, value: e.target.checked })}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
