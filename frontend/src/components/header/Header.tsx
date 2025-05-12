"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Drawer,
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

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ py: 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />

          {!isMobile ? (
            <DesktopNavigation
              items={NAV_ITEMS}
              session={session}
              status={status}
            />
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
          status={status}
        />
      </Drawer>
    </AppBar>
  );
};

export default Header;
