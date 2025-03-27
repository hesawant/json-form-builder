import { TextField as MuiTextField, Stack, Typography } from "@mui/material";

import { EmailSchema } from "src/types";

type Props = {
  field: EmailSchema;
  errors: string[];
  onChange: (field: EmailSchema) => void;
};

const Email = ({ field, errors, onChange }: Props) => {
  const { label, placeholder, name, type, required } = field;

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

export default Email;
