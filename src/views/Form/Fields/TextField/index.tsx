import { TextField as MuiTextField, Stack, Typography } from "@mui/material";

import { TextFieldSchema } from "src/types";

type Props = {
  field: TextFieldSchema;
  value: string | undefined;
  errors: string[];
  onChange: (value: string) => void;
};

const TextField = ({ field, value, errors, onChange }: Props) => {
  const { label, placeholder, name, type, numberOfLines, required } = field;

  const error = errors.length > 0 ? errors[0] : undefined;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="baseline"
      gap={1}
    >
      {/* <Typography variant="caption">{label}</Typography> */}
      <MuiTextField
        required={required}
        fullWidth
        label={label}
        placeholder={placeholder}
        name={name}
        // defaultValue={value}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ flexGrow: 1 }}
        slotProps={{
          input: {
            type,
            rows: numberOfLines,
            multiline: Boolean(numberOfLines && numberOfLines > 1),
            error: !!error,
          },
        }}
        helperText={
          error ? (
            <Typography color="error" variant="caption">
              {error}
            </Typography>
          ) : undefined
        }
      />
    </Stack>
  );
};

export default TextField;
