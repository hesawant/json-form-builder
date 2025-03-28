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

### Features

- Configuring the form based on JSON schema.
- Custom validation rules for each of the form fields.
- Supports field dependency. A field that has dependency on other field will be hidden until the dependent field has data.

### Supports the following types:

- Checkbox
- Date
- Email
- Radio (nested)
- Select
- Text

## Schema Validation

- The schemas for supported form controls are defined in `src/types`.
- Helper functions, such as `getTextFieldSchemaValidators`, are available to generate an array of validation rules based on the JSON configuration.
- `yup` is used for data validation according to the rules defined in JSON.

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
  dependencies?: FieldDependency[];
};

// Example schema
// {
//     name: "username",
//     type: FieldType.TEXT,
//     label: "Username",
//     required: true,
//     value: "example",
//     placeholder: "Enter your username",
//     validationRules: [
//       {
//         type: "max",
//         value: 10,
//         error: "Username must be less than 10 characters",
//       },
//       {
//         type: "min",
//         value: 3,
//         error: "Username must be at least 3 characters",
//       },
//     ],
//   }

// Other schemas follow a similar pattern.
```

## Redux Store

Redux is used as the data store to manage parsed JSON and validation errors.

### Store Structure

- Actions: Used to modify the Redux state while ensuring validation checks are performed when a form is added or updated.
- Selectors: Helper functions for fetching data from the store in components.
- Slices: Defines the overall store structure.

```TypeScript
export type FormField =
  | CheckboxSchema
  | DateSchema
  | EmailSchema
  | RadioSchema
  | SelectSchema
  | TextFieldSchema;

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
- Right Panel: Renders selected form based on the provided JSON schema.
- Real-Time Validation: Validation errors are displayed as the user interacts with the form.
- Form Submission: If errors exist upon submission, they are displayed in an alert and form submit is prevented.

### Components

- `Form`: Represents a list of fields such as `TextField`, `Select`, `Radio`, `Checkbox`, etc.
- `JsonInputDialog`: Accepts a JSON string and performs basic validation:
  - Ensures the JSON string is valid. Checks for `type` being one of the supported types and `name` field being present.
  - Confirms that at least one form field is present before allowing saving.

### Adding Support for a New Form Control

To introduce a new form control:

- Create a new schema file _control.ts_ under `src/types`.
- Implement get<CONTROL_NAME>SchemaValidators() to return the required validation rules.
- Update `getFormFieldsWithErrors` in `src/store/actions/utils.ts` to incorporate validation for the new control type.
- Create a new component under `src/views/Form/Fields` to render the control.
- Create tests for the schema validators and component.

## Testing Approach

- Refer [Setup Jest in a typescript React project](https://medium.com/@vitor.vicen.te/setting-up-jest-js-for-a-vite-ts-js-react-project-the-ultimate-guide-7816f4c8b738) for setting up jest.
- Tests cover the below items:
  - Schema validators
  - Redux Actions
  - UI components

## Challenges Encountered

### Nested Radio Button Selection

- Handling nested Radio buttons was challenging since selecting a nested option must also select the parent option.
- The solution involved nesting the JSON schema for the Radio control in `options` when hierarchy is needed.
- Utility functions were implemented to reset previously selected values in nested Radio controls when a top-level option is selected.

## Future support

- Custom Widgets: e.g., file upload, rich text editor that can be configured via JSON.

  - The current implementation supports adding custom widgets by adding a new schema type and renderer component.
  - I have added steps to the Readme.md file on how to add support for new form controls.

- Back-End Integration for form data persistence.

  - The data in the redux is completely serializable and can be persisted to the backend if the need arises.
  - Form info can be stored as a JSON blob in a single field.

- Accessibility: Consider accessibility best practices (e.g., keyboard navigation, screen reader support).
  - The form is accessible via keyboard navigation.
