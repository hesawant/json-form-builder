import React, { useState } from "react";
import * as yup from "yup";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";

import { FormField } from "src/types";

type Props = {
  json: FormField[];
  onSave: (json: FormField[]) => void;
  onClose: () => void;
};

/**
 * FormBuilderDialog component allows editing form field configurations in JSON format
 *
 * This dialog component provides a text area for editing form field JSON and validates
 * the input before saving. It displays validation errors if the JSON is invalid.
 *
 * @param {FormField[]} json - Initial form field configuration array
 * @param {(json: FormField[]) => void} onSave - Callback when valid JSON is saved
 * @param {() => void} onClose - Callback to close the dialog
 */

const FormBuilderDialog = ({ json, onSave, onClose }: Props) => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(json, null, 2));
  const [error, setError] = useState<string>();

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJsonInput(value);
  };

  const handleSave = () => {
    const jsonSchema = yup.array().required().min(1);
    try {
      const jsonObject = JSON.parse(jsonInput);
      const isValid = jsonSchema.isValidSync(jsonObject);

      if (isValid) {
        onSave(JSON.parse(jsonInput));
        onClose();
      } else {
        setError("Invalid JSON");
      }
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <Dialog
      open // Its the responsibility of the parent component to render the dialog.
      title="JSON String"
      data-testid="json-input-dialog"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Stack gap={2}>
          <TextField
            onChange={handleJsonInputChange}
            defaultValue={jsonInput}
            multiline
            rows={25}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="json-input-dialog-close-button">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          data-testid="json-input-dialog-save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormBuilderDialog;
