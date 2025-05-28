"use client";
///dashboard/doctor/page

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useDoctor } from "@/hooks/profile/useDoctor";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { DoctorProfileView } from "@/components/dashboard/doctor/DoctorProfile";
import { Doctor } from "@/types/doctor";
import Skelton from "@/components/dashboard/doctor/SkeltonLoading";

export default function DoctorProfilePage() {
  const { data: session, status } = useSession();

  const {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadImage,
    uploadVerification,
    refetch,
  } = useDoctor({ token: session?.user?.token || "" });

  if (status == "loading" || isLoading) {
    return <Skelton />;
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
        <ErrorAlert error="No doctor data found" />
      </Box>
    );
  }

  return (
    <DoctorProfileView
      doctor={profile}
      onUpdate={async (
        data: Partial<
          Pick<
            Doctor,
            | "personal_info"
            | "phone_number"
            | "city"
            | "biography"
            | "experience"
          >
        >
      ) => {
        await updateProfile(data);
      }}
      onImageUpload={async (file: File) => {
        await uploadImage(file);
      }}
      onRefresh={async () => {
        await refetch();
      }}
      onUploadVerification={async (file: File, type: string) => {
        await uploadVerification({ file, type });
      }}
    />
  );
}
