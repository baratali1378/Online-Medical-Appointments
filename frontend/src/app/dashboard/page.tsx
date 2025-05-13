// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function DashboardPage() {
  const { data: session } = useSession(); // Get the user's role from the context
  const role = session?.user.role;
  const router = useRouter();
  console.log("hello", role);

  useEffect(() => {
    if (role === "doctor") {
      // Redirect to the doctor dashboard if the user is a doctor
      router.push("/dashboard/doctor");
    } else if (role === "patient") {
      console.log("hello patient");
      // Redirect to the patient dashboard if the user is a patient
      router.push("/dashboard/patient");
    }
  }, [role, router]); // Dependency array ensures the effect runs when role changes

  // Optionally, show a loading state while the role is being fetched or determined
  if (!role) {
    return <Loading />;
  }

  // Return nothing because it handles the redirect automatically
  return null;
}
