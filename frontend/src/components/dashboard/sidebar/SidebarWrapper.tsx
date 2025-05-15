// components/sidebar/SidebarWrapper.tsx

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import DoctorSidebar from "./DoctorSidebar";
import PatientSidebar from "./PatientSidebar";
import { useRouter } from "next/navigation";

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
      <DoctorSidebar mobileOpen={mobileOpen} onDrawerToggle={onDrawerToggle} />
    );
  else {
    return (
      <PatientSidebar mobileOpen={mobileOpen} onDrawerToggle={onDrawerToggle} />
    );
  }
}
