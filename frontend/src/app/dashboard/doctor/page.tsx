"use client";

import { Box } from "@mui/material";
import { useDoctor } from "@/hooks/profile/doctor/useDoctor";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { DoctorProfileView } from "@/components/dashboard/doctor/profile/DoctorProfile";
import { Doctor } from "@/types/doctor";
import Skelton from "@/components/dashboard/doctor/profile/SkeltonLoading";
import { withAuth } from "@/components/dashboard/withAuth";

type Props = {
  session: any;
};

function DoctorProfilePage({ session }: Props) {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadImage,
    uploadVerification,
    refetch,
  } = useDoctor({ token: session?.user?.token || "" });

  if (isLoading) {
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
      token={session?.user?.token}
      onUpdate={async (
        data: Partial<
          Pick<
            Doctor,
            | "personal_info"
            | "city"
            | "biography"
            | "experience"
            | "clinic_info"
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

export default withAuth(DoctorProfilePage, "doctor");
