import { Button, CircularProgress, Box } from "@mui/material";
import { ReactNode } from "react";

interface FormSubmitButtonProps {
  loading: boolean;
  children: ReactNode;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  loading,
  children,
}) => (
  <Box position="relative" textAlign="center">
    <Button
      type="submit"
      variant="contained"
      disabled={loading}
      sx={{
        bgcolor: "#71C9CE",
        py: 1.2,
        fontWeight: 600,
        fontSize: "1rem",
        borderRadius: 2,
        width: "60%",
      }}
    >
      {loading ? "Please wait..." : children}
    </Button>
    {loading && (
      <CircularProgress
        size={24}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          mt: "-12px",
          ml: "-12px",
        }}
      />
    )}
  </Box>
);
