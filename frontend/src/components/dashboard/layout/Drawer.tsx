"use client";

import {
  Box,
  CssBaseline,
  Drawer,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const drawerWidth = 240;

const ResponsiveSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session } = useSession();
  const role = session?.user?.role;

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const links =
    role === "doctor"
      ? [
          {
            text: "Dashboard",
            path: "/dashboard/doctor",
            icon: <DashboardIcon />,
          },
          {
            text: "Appointments",
            path: "/dashboard/doctor/appointments",
            icon: <CalendarTodayIcon />,
          },
          {
            text: "Profile",
            path: "/dashboard/doctor/profile",
            icon: <PersonIcon />,
          },
        ]
      : [
          {
            text: "Dashboard",
            path: "/dashboard/patient",
            icon: <DashboardIcon />,
          },
          {
            text: "Appointments",
            path: "/dashboard/patient/appointments",
            icon: <CalendarTodayIcon />,
          },
          {
            text: "Profile",
            path: "/dashboard/patient/profile",
            icon: <PersonIcon />,
          },
        ];

  const drawerContent = (
    <Box sx={{ p: 2, bgcolor: "yellow" }}>
      <List>
        {links.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1976d2" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
            borderRight: "1px solid #ddd",
            position: "fixed", // Fixed Sidebar position

            height: "100%", // Full height
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) => theme.palette.background.default,
          p: 3,
          ml: `${drawerWidth}px`, // Push content to the right of the sidebar
          height: "100vh", // Full screen height
          overflowY: "auto", // Allow scrolling within the content area
        }}
      >
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default ResponsiveSidebar;
