import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";
import { FormFieldConfig } from "@/types/formFields";

export const SelectField: React.FC<FormFieldConfig> = ({
  name,
  label,
  options = [],
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      fullWidth
      select
      label={label}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ""}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
