// components/LoginButtons.tsx
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { NavigationCommands } from "@/lib/navigationCommands";

export const LoginButtons = () => {
  const router = useRouter();

  return (
    <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
      <Button
        variant="outlined"
        onClick={() => NavigationCommands.goToLogin(router, "patient")}
        sx={{
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.85rem",
          padding: "6px 16px",
          color: "text.secondary",
          borderColor: "#E0E0E0",
          "&:hover": {
            borderColor: "#71C9CE",
            color: "#71C9CE",
          },
        }}
      >
        Patient Login
      </Button>
      <Button
        variant="contained"
        onClick={() => NavigationCommands.goToLogin(router, "doctor")}
        sx={{
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.85rem",
          padding: "6px 16px",
          backgroundColor: "#71C9CE",
          "&:hover": {
            backgroundColor: "#5AB5BA",
          },
        }}
      >
        Doctor Login
      </Button>
    </div>
  );
};
