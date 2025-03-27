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
