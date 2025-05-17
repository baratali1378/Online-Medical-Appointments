"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import PatientProfileView from "@/components/dashboard/patient/PatientProfileView";
import { usePatientProfile } from "@/hooks/profile/usePatient";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handle redirect in useEffect
  useEffect(() => {
    if (status === "unauthenticated" && !isRedirecting) {
      setIsRedirecting(true);
      redirect("/patient-login");
    }
  }, [status, isRedirecting]);

  // Get token safely
  const token = session?.user?.token || null;

  // Call hook unconditionally at the top level
  const { patient, loading, error, updateProfile, uploadImage, refetch } =
    usePatientProfile({ token });

  if (status === "loading" || loading) {
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
    throw new Error(error);
  }

  if (!patient) {
    return (
      <Typography align="center" mt={4}>
        No patient found.
      </Typography>
    );
  }

  return (
    <PatientProfileView
      patient={patient}
      onUpdate={updateProfile}
      onImageUpload={uploadImage}
      onRefresh={refetch}
    />
  );
}
