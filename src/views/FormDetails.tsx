import { useState } from "react";
import { Alert, Box, IconButton, Stack, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useDispatch, useSelector } from "src/store";
import { deleteForm, updateForm } from "src/store/actions";
import { getFormByIndex } from "src/store/selectors";

import JsonInputDialog from "src/views/JsonInputDialog";

import Form from "./Form";
import { FormSchema } from "src/types";

type Props = {
  index: number;
  onDelete: (index: number) => void;
};

const FormDetails = ({ index, onDelete }: Props) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => getFormByIndex(state, index));

  const [jsonInputDialogOpen, setJsonInputDialogOpen] = useState(false);

  if (!form) {
    return (
      <Box width="100%">
        <Alert severity="error">Form not found</Alert>
      </Box>
    );
  }

  const handleSave = (json: FormSchema) => {
    dispatch(updateForm(index, json));
  };

  const handleDelete = () => {
    dispatch(deleteForm(index));
    onDelete(index);
  };

  return (
    <Stack height="100%" flexGrow={1}>
      <Stack direction="row" justifyContent="flex-end">
        <Tooltip title="Edit form JSON">
          <IconButton onClick={() => setJsonInputDialogOpen(true)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete form">
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
        {jsonInputDialogOpen && (
          <JsonInputDialog
            json={form.fields.map((field) => field.field)}
            onClose={() => setJsonInputDialogOpen(false)}
            onSave={handleSave}
          />
        )}
      </Stack>
      <Form form={form} index={index} />
    </Stack>
  );
};

export default FormDetails;
