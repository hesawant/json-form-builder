import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "src/store";
import { addForm } from "src/store/actions";
import { getForms } from "src/store/selectors";

import JsonInputDialog from "src/views/JsonInputDialog";

import { formData } from "src/data/form";
import { useState } from "react";
import { FormField } from "src/types";

type Props = {
  selectedIndex: number;
  onClick: (index: number) => void;
};

const FormList = ({ selectedIndex, onClick }: Props) => {
  const dispatch = useDispatch();
  const forms = useSelector(getForms);

  const [jsonInputDialogOpen, setJsonInputDialogOpen] = useState(false);

  const handleAddForm = (json: FormField[]) => {
    dispatch(addForm(json));

    // Not subtracting 1 because the latest added form is not yet in redux
    onClick(forms.length);
  };

  return (
    <Stack flexShrink={0} gap={2}>
      <Button variant="contained" onClick={() => setJsonInputDialogOpen(true)}>
        Add new form
      </Button>
      {jsonInputDialogOpen && (
        <JsonInputDialog
          json={formData}
          onSave={handleAddForm}
          onClose={() => setJsonInputDialogOpen(false)}
        />
      )}

      <List sx={{ overflow: "auto" }}>
        {forms.map((_, index) => {
          return (
            <ListItemButton
              key={index}
              onClick={() => onClick(index)}
              selected={selectedIndex === index}
            >
              <ListItemText>Form {index + 1}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  );
};

export default FormList;
