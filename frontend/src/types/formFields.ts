export type FieldType = "text" | "email" | "password" | "date" | "select";

export const genderOptions = ["Male", "Female", "Other"];

export interface Option {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // only for 'select'
}
