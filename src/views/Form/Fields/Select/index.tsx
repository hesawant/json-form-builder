import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

import { SelectSchema } from "src/types";

type Props = {
  field: SelectSchema;
  value: string;
  errors: string[];
  onChange: (value: string) => void;
};

const Select = ({ field, value, errors, onChange }: Props) => {
  const { label, name, required, options } = field;

  return (
    <FormControl fullWidth>
      <InputLabel id="test-select-label">{label}</InputLabel>
      <MuiSelect
        error={errors?.length > 0}
        required={required}
        label={label}
        labelId="test-select-label"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
