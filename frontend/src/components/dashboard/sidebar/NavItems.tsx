import React from "react";
import Link from "next/link";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface Props {
  items: NavItem[];
  onItemClick?: (index: number) => void;
}

const colors = {
  lightest: "#E3FDFD",
  lighter: "#CBF1F5",
  light: "#A6E3E9",
  main: "#71C9CE",
  textDark: "#222222",
  white: "#ffffff",
};

export default function NavItems({ items, onItemClick }: Props) {
  const pathname = usePathname();

  return (
    <List>
      {items.map(({ text, icon, path }, index) => {
        const isActive = pathname === path;

        return (
          <ListItemButton
            key={text}
            component={Link}
            href={path}
            selected={isActive}
            onClick={() => onItemClick?.(index)}
            sx={{
              borderRadius: 2,
              mb: 1,
              px: 2,
              py: 1.5,
              color: colors.textDark,
              "&.Mui-selected": {
                backgroundColor: colors.main,
                "& .MuiListItemText-primary": {
                  color: colors.white,
                  fontWeight: 600,
                },
                "& .MuiListItemIcon-root": {
                  color: colors.white,
                },
              },
              "& .MuiListItemText-primary": {
                fontWeight: 500,
                color: colors.textDark,
              },
              "& .MuiListItemIcon-root": {
                color: colors.textDark,
              },
              "&:hover": {
                backgroundColor: colors.light,
                "& .MuiListItemText-primary": {
                  color: colors.textDark,
                },
                "& .MuiListItemIcon-root": {
                  color: colors.textDark,
                },
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
