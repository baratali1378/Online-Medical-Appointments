// app/dashboard/patient/profile/page.tsx
"use client";

import { CircularProgress, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePatient } from "@/hooks/profile/usePatient";
import PatientProfileView from "@/components/dashboard/patient/PatientProfileView";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/patient/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    // Session not ready or redirecting
    return null;
  }

  const token = session.user?.token || "";

  if (!token) {
    return (
      <Box p={3}>
        <ErrorAlert error="Authentication token not found." />
      </Box>
    );
  }

  const { profile, isLoading, error, updateProfile, uploadImage, refetch } =
    usePatient(token);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <ErrorAlert error={error.message} />
      </Box>
    );
  }

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
      onUpdate={async (data) => {
        await updateProfile(data);
      }}
      onImageUpload={async (file) => {
        await uploadImage(file);
      }}
      onRefresh={async () => {
        await refetch();
      }}
    />
  );
}
