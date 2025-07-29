// app/dashboard/patient/profile/page.tsx
"use client";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePatient } from "@/hooks/profile/patient/usePatient";
import { PatientProfileView } from "@/components/dashboard/patient/profile/PatientProfileView";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { useEffect } from "react";
import { PatientProfileFormValues } from "@/types/patient";
import { PatientProfileSkeleton } from "@/components/dashboard/patient/SkeltonLoading";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Always call usePatient unconditionally at the top level
  const { profile, isLoading, error, updateProfile, uploadImage, refetch } =
    usePatient({ token: session?.user?.token || "" });

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/patient/login");
    }
  }, [status, router]);

  // Combined loading state
  if (status === "loading" || isLoading) {
    return <PatientProfileSkeleton />;
  }

  // API error state
  if (error) {
    return (
      <Box p={3}>
        <ErrorAlert error={error.message} />
      </Box>
    );
  }

  // No profile data state
  if (!profile) {
    return (
      <Box p={3}>
        <ErrorAlert error="No patient data found" />
      </Box>
    );
  }

  return (
    <PatientProfileView
      patient={profile}
      onUpdate={async (data: Partial<PatientProfileFormValues>) => {
        await updateProfile(data);
      }}
      onImageUpload={async (file: File) => {
        await uploadImage(file);
      }}
      onRefresh={async () => {
        await refetch();
      }}
    />
  );
}
