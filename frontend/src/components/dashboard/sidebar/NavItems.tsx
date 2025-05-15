// components/sidebar/NavItems.tsx
"use client";

import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface Props {
  items: NavItem[];
  activeIndex?: number;
  onItemClick?: (index: number) => void;
}

export default function NavItems({ items, activeIndex, onItemClick }: Props) {
  const theme = useTheme();

  return (
    <List>
      {items.map(({ text, icon, onClick }, index) => (
        <ListItemButton
          key={text}
          selected={index === activeIndex}
          onClick={() => {
            onItemClick?.(index);
            onClick?.();
          }}
          sx={{
            borderRadius: 1,
            mb: 1,
            "&.Mui-selected": {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "& .MuiListItemIcon-root": {
                color: theme.palette.primary.contrastText,
              },
            },
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
}
