"use client";

import {
  Drawer,
  Toolbar,
  Avatar,
  Typography,
  Box,
  useMediaQuery,
  Theme,
  Divider,
} from "@mui/material";
import { Dashboard, People, EventNote } from "@mui/icons-material";
import NavItems from "./NavItems";

const drawerWidth = 260;

const navItems = [
  { text: "Dashboard", icon: <Dashboard /> },
  { text: "Patients", icon: <People /> },
  { text: "Appointments", icon: <EventNote /> },
];

export default function DoctorSidebar({
  mobileOpen,
  onDrawerToggle,
}: {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const drawer = (
    <>
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2, px: 2 }}>
        <Avatar alt="Doctor User" src="/doctor-avatar.png" />
        <Typography variant="h6" noWrap>
          Doctor Name
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ px: 2, pt: 2 }}>
        <NavItems items={navItems} />
      </Box>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}
