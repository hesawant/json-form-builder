import { Box } from "@mui/material";
import { FormState } from "src/store/slices";

type Props = {
  form: FormState;
};

const Form = ({ form }: Props) => {
  return (
    <Box>
      {form.fields.map((field, index) => {
        return (
          <Box key={index}>
            {field.field.type} - {field.field.name}
          </Box>
        );
      })}
    </Box>
  );
};

export default Form;
