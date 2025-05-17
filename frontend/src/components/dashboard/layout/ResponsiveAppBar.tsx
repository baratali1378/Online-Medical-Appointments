"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";
import { useUserMenu } from "@/hooks/profile/dashboard/useUserMenu";

export default function ResponsiveAppBar({
  onDrawerToggle,
}: {
  onDrawerToggle: () => void;
}) {
  const { data: session } = useSession();
  const role = session?.user?.role;

  console.log(session?.user.token);

  const {
    anchorEl,
    open,
    handleMenuOpen,
    handleMenuClose,
    handleProfile,
    handleSignOut,
  } = useUserMenu(role);

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
        {/* Menu toggle button for mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {session?.user && (
          <>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 2,
                sx: {
                  mt: 1.5,
                  minWidth: 160,
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
