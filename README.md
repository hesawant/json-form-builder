# Dynamic JSON Form Builder

JSON-Driven Form Builder with Redux State Management.

## Setup

Run the below steps

- Clone the repo locally.
- Ensure that you have `yarn` installed.
- Run `yarn install` in the root directory.
- Run `yarn dev` to run the app locally.
- Run `yarn build` to build site.
- Run `yarn test` to run tests
- Run `yarn cov` to get the test coverage

## Overview

This application accepts a JSON schema and dynamically renders a form based on the provided configuration.

## Schema Validation

- The schemas for supported form controls are defined in `src/types`.
- Helper functions, such as `getTextFieldSchemaValidators`, are available to generate an array of validation rules based on the configuration.
- `yup` is used for data validation according to the defined rules.

### Example: TextField Schema with Validation Rules

```typescript
export type MaxLengthRule = {
  type: "max";
  value: number;
  error?: string;
};

export type MinLengthRule = {
  type: "min";
  value: number;
  error?: string;
};

export type PatternRule = {
  type: "pattern";
  value: string;
  error?: string;
};

export type TextFieldSchema = {
  type: "text";
  name: string;
  label: string;
  numberOfLines?: number;
  placeholder?: string;
  required?: boolean;
  value?: string;
  validationRules?: (MaxLengthRule | MinLengthRule | PatternRule)[];
};

// Other schemas follow a similar pattern.
```

## Redux Store

Redux is used as the data store to manage parsed JSON and validation errors.

### Store Structure

- Actions: Used to modify the Redux state while ensuring validation checks are performed when a form is added or updated.
- Selectors: Helper functions for fetching data from the store in components.
- Slices: Defines the overall store structure.

```TypeScript
export type FormFieldState = {
  field: FormField;
  errors: string[];
};

export type FormState = {
  fields: FormFieldState[];
};

export type FormsState = {
  forms: FormState[];
};
```

## Form UI

The UI is built using Material UI and is divided into two sections:

- Left Panel: Displays a list of added forms.
- Right Panel: Renders the form based on the provided JSON schema.
- Real-Time Validation: Validation errors are displayed as the user interacts with the form.
- Form Submission: If errors exist upon submission, they are displayed in an alert.

### Components

- `Form`: Represents a list of fields such as `TextField`, `Select`, `Radio`, and `Checkbox`.
- `JsonInputDialog`: Accepts a JSON string and performs basic validation:
  - Ensures the JSON string is valid.
  - Confirms that at least one form field is present.

### Adding Support for a New Form Control

To introduce a new form control:

- Create a new file control.ts.
- Define the schema for the control in src/types.
- Implement get<CONTROL_NAME>SchemaValidators() to return the required validation rules.
- Update getFormFieldsWithErrors to incorporate validation for the new control type.
- Create a new component under src/views/Form/Fields to render the control.

## Testing Approach

- Refer [Setup Jest in a typescript React project](https://medium.com/@abhishekpn98/setup-jest-in-a-typescript-react-project-cfb8188534ec) for setting up jest.
- Tests cover the below items:
  - Schema validators
  - Redux Actions
  - UI components

## Challenges Encountered

### Nested Radio Button Selection

- Handling nested Radio buttons was challenging since selecting a nested option must also select the parent option.
- The solution involved nesting the JSON schema for the Radio control when hierarchy is needed.
- Utility functions were implemented to reset previously selected values in nested Radio controls when a top-level option is selected.
