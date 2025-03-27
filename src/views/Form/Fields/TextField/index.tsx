import { TextField as MuiTextField, Stack, Typography } from "@mui/material";

import { TextFieldSchema } from "src/types";

type Props = {
  field: TextFieldSchema;
  errors: string[];
  onChange: (field: TextFieldSchema) => void;
};

const TextField = ({ field, errors, onChange }: Props) => {
  const { label, placeholder, name, type, numberOfLines, required } = field;

  const error = errors.length > 0 ? errors[0] : undefined;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="baseline"
      gap={1}
    >
      <MuiTextField
        required={required}
        fullWidth
        label={label}
        placeholder={placeholder}
        name={name}
        value={field.value || ""}
        onChange={(e) => onChange({ ...field, value: e.target.value })}
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
