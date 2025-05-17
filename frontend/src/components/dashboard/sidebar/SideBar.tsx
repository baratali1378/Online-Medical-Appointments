// components/sidebar/Sidebar.tsx
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
import NavItems from "./NavItems";
import { Poppins } from "next/font/google";

// Import Poppins with desired weights
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const drawerWidth = 260;

type SidebarProps = {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  navItems: Array<{
    text: string;
    icon: React.ReactNode;
    path: string;
  }>;
  title?: string;
};

export default function Sidebar({
  mobileOpen,
  onDrawerToggle,
  navItems,
  title = "Dashboard",
}: SidebarProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const drawer = (
    <div className={poppins.className}>
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2, px: 2 }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ px: 2, pt: 2 }}>
        <NavItems items={navItems} />
      </Box>
    </div>
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
