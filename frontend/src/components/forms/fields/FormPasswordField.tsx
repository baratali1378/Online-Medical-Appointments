import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useField } from "formik";
import { FormFieldConfig } from "@/types/formFields"; // adjust path as needed

export const PasswordField: React.FC<FormFieldConfig> = ({
  name,
  label,
  placeholder = "",
  mt,
}) => {
  const [field, meta] = useField(name);
  const [show, setShow] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      type={show ? "text" : "password"}
      placeholder={placeholder}
      sx={{
        mt: mt,
      }}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShow((s) => !s)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
