// components/layout/ResponsiveAppBar.tsx

"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";

export default function ResponsiveAppBar({
  onDrawerToggle,
}: {
  onDrawerToggle: () => void;
}) {
  const { data: session } = useSession();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
        backgroundColor: "white",
        color: "black",
      }}
      elevation={1}
    >
      <Toolbar>
        {/* Toggle for mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* User info */}
        {session?.user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{session.user.name}</Typography>
            <Avatar
              src={session.user.image || "/default-avatar.png"}
              alt="User Avatar"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
