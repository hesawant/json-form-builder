export type SelectOption = {
  label: string;
  value: string;
};

export type SelectSchema = {
  type: "select";
  name: string;
  label: string;
  options: SelectOption[];
  value?: string;
};
