import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormFieldConfig } from "@/types/formFields"; // adjust path as needed

export const FormTextField = ({
  name,
  label,
  type,
  placeholder = "",
}: Omit<FormFieldConfig, "options">) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      placeholder={placeholder}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ""}
    />
  );
};
