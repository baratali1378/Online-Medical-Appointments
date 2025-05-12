"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

export const ProfileMenu = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar
          src={user.image || "/default_profile.jpg"}
          alt={user.name || "Profile"}
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ elevation: 4, sx: { mt: 1.5, minWidth: 180 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={Link}
          href="/dashboard/patient"
          onClick={handleClose}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Sign out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
