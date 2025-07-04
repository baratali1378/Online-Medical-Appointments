"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { NavItem } from "../../config/navigation";
import { Poppins } from "next/font/google";
import { Session } from "next-auth";
import { ProfileMenu } from "./ProfileMenu";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface MobileDrawerProps {
  items: NavItem[];
  onClose: () => void;
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

interface NavLinkProps {
  label: string;
  href: string;
  hoverColor: string;
  textColor: string;
  hoverBg: string;
  onClick?: () => void;
}

const NavLinkItem = ({
  label,
  href,
  hoverColor,
  textColor,
  hoverBg,
  onClick,
}: NavLinkProps) => (
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      href={href}
      onClick={onClick}
      sx={{
        textAlign: "left",
        paddingY: 1.5,
        paddingX: 3,
        color: textColor,
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          backgroundColor: hoverBg,
          color: hoverColor,
          borderRadius: 2,
        },
      }}
    >
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontWeight: 500,
          fontSize: "1rem",
        }}
      />
    </ListItemButton>
  </ListItem>
);

export const MobileDrawer = ({
  items,
  onClose,
  session,
  status,
}: MobileDrawerProps) => {
  if (status === "loading") return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        textAlign: "center",
        width: 280,
        paddingY: 2,
        backgroundColor: "#fefefe",
        borderRadius: 2,
        boxShadow: 4,
      }}
      className={poppins.className}
    >
      <List>
        {items.map((item, index) => (
          <Box key={item.label}>
            <NavLinkItem
              label={item.label}
              href={item.href}
              hoverColor="#1976d2"
              textColor="#333"
              hoverBg="#e3f2fd"
              onClick={onClose}
            />
            {index < items.length - 1 && <Divider sx={{ marginX: 2 }} />}
          </Box>
        ))}
      </List>

      {!session ? (
        <>
          <Divider sx={{ my: 2, mx: 2 }} />
          <List>
            <NavLinkItem
              label="Login Doctor"
              href="/login/doctor"
              hoverColor="#2e7d32"
              textColor="#4a4a4a"
              hoverBg="#f1f8e9"
              onClick={onClose}
            />
            <NavLinkItem
              label="Login Patient"
              href="/login/patient"
              hoverColor="#ad1457"
              textColor="#4a4a4a"
              hoverBg="#fce4ec"
              onClick={onClose}
            />
          </List>
        </>
      ) : (
        <Box sx={{ px: 3, py: 2 }}>
          <ProfileMenu url={session.user.image || ""} />
        </Box>
      )}
    </Box>
  );
};
