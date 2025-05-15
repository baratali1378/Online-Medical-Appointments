"use client";

import {
  Drawer,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  Theme,
  Divider,
} from "@mui/material";
import { Person, MedicalServices, Event } from "@mui/icons-material";
import NavItems from "./NavItems";

const drawerWidth = 260;

const navItems = [
  { text: "My Appointments", icon: <Event /> },
  { text: "Doctors", icon: <Person /> },
  { text: "Medical Records", icon: <MedicalServices /> },
];

export default function PatientSidebar({
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
        <Typography variant="h6" noWrap>
          Dashboard
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
