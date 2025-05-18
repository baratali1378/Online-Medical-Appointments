import { Button } from "@mui/material";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

interface LoginButtonProps {
  type: "patient" | "doctor";
}

export const LoginButton = ({ type }: LoginButtonProps) => {
  const config = {
    patient: {
      href: "/login/patient",
      label: "Patient Login",
      variant: "outlined" as const,
      sx: {
        borderColor: "#E0E0E0",
        color: "text.secondary",
        "&:hover": { borderColor: "#71C9CE", color: "#71C9CE" },
      },
    },
    doctor: {
      href: "/login/doctor",
      label: "Doctor Login",
      variant: "contained" as const,
      sx: {
        backgroundColor: "#71C9CE",
        color: "white",
        "&:hover": {
          backgroundColor: "#5AB5BA",
          transform: "translateY(-1px)",
        },
      },
    },
  };

  const { href, label, variant, sx } = config[type];

  return (
    <Button
      variant={variant}
      component={Link}
      href={href}
      className={montserrat.className}
      sx={{
        fontWeight: 600,
        textTransform: "none",
        fontSize: "0.85rem",
        px: 2,
        py: 0.8,
        transition: "all 0.2s ease",
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
