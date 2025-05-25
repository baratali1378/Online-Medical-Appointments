// components/common/ErrorAlert.tsx
import { Alert, AlertProps } from "@mui/material";

interface ErrorAlertProps extends AlertProps {
  error: string;
}

export const ErrorAlert = ({ error, ...props }: ErrorAlertProps) => {
  return (
    <Alert severity="error" {...props}>
      {error}
    </Alert>
  );
};
