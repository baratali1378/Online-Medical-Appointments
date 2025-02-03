import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Field } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface CustomFieldProps {
    name: string;
    label: string;
    type?: string;
    showPassword?: boolean;
    setShowPassword?: (show: boolean) => void;
}

const CustomField: React.FC<CustomFieldProps> = ({ name, label, type = "text", showPassword, setShowPassword }) => {
    const handleClickShowPassword = () => {
        if (setShowPassword) setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Field
            as={TextField}
            fullWidth
            label={label}
            name={name}
            variant="outlined"
            margin="normal"
            required
            type={type === "password" && showPassword !== undefined ? (showPassword ? "text" : "password") : type}
            InputProps={type === "password" ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : undefined}
        />
    );
};

export default CustomField;
