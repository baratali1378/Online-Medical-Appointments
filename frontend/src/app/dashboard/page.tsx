"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/loading";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;
      if (role === "doctor") {
        router.replace("/dashboard/doctor");
      } else if (role === "patient") {
        router.replace("/dashboard/patient");
      } else {
        router.replace("/"); // fallback if role is missing
      }
    } else if (status === "unauthenticated") {
      router.replace("/"); // redirect unauthenticated users
    }
  }, [status, session, router]);

  return <Loading />;
}
