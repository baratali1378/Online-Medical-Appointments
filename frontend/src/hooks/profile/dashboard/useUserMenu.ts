// hooks/useUserMenu.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export const useUserMenu = (role?: string) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    if (role) router.push(`/dashboard/${role}/profile`);
    handleMenuClose();
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  return {
    anchorEl,
    open,
    handleMenuOpen,
    handleMenuClose,
    handleProfile,
    handleSignOut,
  };
};
