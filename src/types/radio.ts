export type RadioOption = {
  label: string;
  value: string;
};

export type RadioSchema = {
  type: "radio";
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
};
