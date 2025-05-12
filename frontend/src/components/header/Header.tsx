"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";
import { NAV_ITEMS } from "../../config/navigation";
import { MobileDrawer } from "./MobileDrawer";
import { DesktopNavigation } from "./DesktopNavigation";
import { Logo } from "./Logo";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session, status } = useSession();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Show minimal header while session is loading
  if (status === "loading") {
    return (
      <AppBar position="static" color="default" elevation={1} sx={{ py: 1 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Logo />
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                {NAV_ITEMS.map((item) => (
                  <Box
                    key={item.label}
                    sx={{ width: 80, height: 24, bgcolor: "#f0f0f0" }}
                  />
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ py: 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />

          {!isMobile ? (
            <DesktopNavigation items={NAV_ITEMS} session={session} />
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 } }}
      >
        <MobileDrawer
          items={NAV_ITEMS}
          onClose={handleDrawerToggle}
          session={session}
        />
      </Drawer>
    </AppBar>
  );
};

export default Header;
