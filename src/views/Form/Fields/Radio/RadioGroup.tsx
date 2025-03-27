import React from "react";

import {
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio,
  Box,
} from "@mui/material";

import { RadioSchema } from "src/types";

type Props = {
  field: RadioSchema;
  disabled?: boolean;
  onChange: (field: RadioSchema) => void;
};

// This function is used to unset the value for nested radio fields
// It is used to prevent the nested radio fields from being selected when the parent radio field is not selected
const unsetValueForNested = (value: RadioSchema) => {
  const tempField = { ...value };

  tempField.options = tempField.options.map((o) => {
    return {
      ...o,
      nested: o.nested
        ? {
            ...unsetValueForNested(o.nested),
            value: undefined,
          }
        : undefined,
    };
  });

  return tempField;
};

const setValueForNested = (field: RadioSchema, selected: string) => {
  let selectedOption = field.options.find((o) => o.value === selected);

  if (selectedOption?.nested) {
    selectedOption.nested.value = selectedOption.nested.options.length
      ? selectedOption.nested.options[0].value
      : undefined;

    selectedOption = {
      ...selectedOption,
      nested: setValueForNested(
        selectedOption.nested,
        selectedOption.nested.options[0].value
      ),
    };
  }

  return field;
};

const RadioGroup = ({ field, disabled, onChange }: Props) => {
  return (
    <MuiRadioGroup key={field.value} value={field.value}>
      {field.options.map((option, index) => {
        return (
          <React.Fragment key={option.value}>
            <FormControlLabel
              disabled={disabled}
              label={option.label}
              control={
                <MuiRadio
                  value={option.value}
                  onChange={(e) => {
                    let newField = unsetValueForNested(field);
                    newField = setValueForNested(newField, e.target.value);
                    onChange({ ...newField, value: e.target.value });
                  }}
                />
              }
            />
            {option.nested && (
              <Box sx={{ paddingLeft: "20px" }}>
                <RadioGroup
                  field={option.nested}
                  disabled={option.value !== field.value}
                  onChange={(newField) => {
                    const newOptions = [...field.options];
                    newOptions[index] = {
                      ...newOptions[index],
                      nested: newField,
                    };
                    onChange({ ...field, options: newOptions });
                  }}
                />
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </MuiRadioGroup>
  );
};

export default RadioGroup;
