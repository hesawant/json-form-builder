import { useState } from "react";
import { Alert, Box, IconButton, Stack, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useDispatch, useSelector } from "src/store";
import {
  deleteForm,
  updateForm,
  updateFormFieldValue,
} from "src/store/actions";
import { getFormByIndex } from "src/store/selectors";

import FormBuilderDialog from "src/views/FormBuilderDialog";

import Form from "src/components/Form";
import { FormField } from "src/types";

type Props = {
  index: number;
  onDelete: (index: number) => void;
};

/**
 * FormDetails component displays and manages a single form's details and interactions
 *
 * This component handles:
 * - Displaying form fields using the Form component
 * - Editing form configuration via FormBuilderDialog
 * - Deleting the form
 * - Updating field values
 * - Error state when form is not found
 *
 * @param {number} index - Index of the form to display
 * @param {(index: number) => void} onDelete - Callback when form is deleted
 */

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

  const handleChange = (fieldIndex: number, value: FormField) => {
    dispatch(updateFormFieldValue(index, fieldIndex, value));
  };

  const handleSave = (json: FormField[]) => {
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
          <FormBuilderDialog
            json={form.fields.map((field) => field.field)}
            onClose={() => setJsonInputDialogOpen(false)}
            onSave={handleSave}
          />
        )}
      </Stack>
      <Form key={index} form={form} onChange={handleChange} />
    </Stack>
  );
};

export default FormDetails;
