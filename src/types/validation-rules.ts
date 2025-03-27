import * as yup from "yup";

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

export type Validator = {
  validator:
    | yup.StringSchema<string | undefined>
    | yup.NumberSchema<number | undefined>
    | yup.BooleanSchema<boolean | undefined>;
  error: string;
};
