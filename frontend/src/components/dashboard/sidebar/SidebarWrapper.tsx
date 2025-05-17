// components/sidebar/SidebarWrapper.tsx

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "./SideBar";
import { doctorNavItems, patientNavItems } from "./utils";

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function SidebarWrapper({
  mobileOpen,
  onDrawerToggle,
}: SidebarProps) {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !role) {
      router.push("/");
    }
  }, [role, status, router]);

  if (session?.user.role == "doctor")
    return (
      <Sidebar
        mobileOpen={mobileOpen}
        navItems={doctorNavItems}
        title="Doctor Panel"
        onDrawerToggle={onDrawerToggle}
      />
    );
  else {
    return (
      <Sidebar
        mobileOpen={mobileOpen}
        navItems={patientNavItems}
        title="Dashboard"
        onDrawerToggle={onDrawerToggle}
      />
    );
  }
}
