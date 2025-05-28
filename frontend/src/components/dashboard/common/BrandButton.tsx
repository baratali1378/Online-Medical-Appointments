// components/common/BrandButton.tsx
import {
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

interface BrandButtonProps {
  children: ReactNode;
  loading?: boolean;
  variant?: "text" | "outlined" | "contained";
  disabled?: boolean;
  startIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export const BRAND_COLOR = "#A6E3E9";
export const BRAND_HOVER = "#90dbe2";

export const BrandButton = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  type = "button",
  onClick,
  size = "medium",
  variant = "contained",
  fullWidth = false,
}: BrandButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled || loading}
      startIcon={
        loading ? (
          <CircularProgress size={20} sx={{ color: "#000" }} />
        ) : (
          startIcon
        )
      }
      onClick={onClick}
      size={isMobile ? "small" : size}
      fullWidth={fullWidth}
      sx={{
        backgroundColor: BRAND_COLOR,
        color: "#ffff",
        px: 4,
        py: 1,
        borderRadius: 2,
        fontWeight: 600,
        "&:hover": {
          backgroundColor: BRAND_HOVER,
        },
        "&:disabled": {
          backgroundColor: "#CBF1F5",
          color: "#9CA3AF",
        },
      }}
    >
      {children}
    </Button>
  );
};
