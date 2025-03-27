import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

import { SelectSchema } from "src/types";

type Props = {
  field: SelectSchema;
  errors: string[];
  onChange: (field: SelectSchema) => void;
};

const Select = ({ field, errors, onChange }: Props) => {
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
        value={field.value}
        onChange={(e) => onChange({ ...field, value: e.target.value })}
        data-testid="form-select"
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
