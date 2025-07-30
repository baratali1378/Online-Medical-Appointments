"use client";

import { Box, Grid2 } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { Doctor } from "@/types/doctor";
import { ProfileImageCard } from "../../common/ProfileImageCard";
import { PersonalInfoCard } from "./PersonalInfo";
import { SpecialtiesCard } from "./specialty/SpecialtyCard";
import { AvailableSlotsCard } from "./timeSlots/AvailableSlotsCard";
import { AnimatedGridItem } from "@/components/common/AnimatedGridItem";
import { VerificationCard } from "./verification/VerificationCard";
import { ClinicInfoCard } from "./clinic_info/ClinicInfoCard";

interface DoctorProfileViewProps {
  doctor: Doctor;
  token: string;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  onUploadVerification: (file: File, type: string) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export const DoctorProfileView = ({
  doctor,
  token,
  onUpdate,
  onImageUpload,
  onRefresh,
  onUploadVerification,
}: DoctorProfileViewProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingVerification, setIsUploadingVerification] = useState(false);

  const handleUpdateProfile = async (data: Partial<Doctor>) => {
    try {
      setIsUpdating(true);
      await onUpdate(data);
      toast.success("Profile updated successfully!");
      await onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onImageUpload(file);
      toast.success("Profile image updated successfully!");
      await onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadVerification = async (file: File, type: string) => {
    try {
      setIsUploadingVerification(true);
      await onUploadVerification(file, type);
      toast.success("Verification document uploaded successfully!");
      await onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload verification document");
    } finally {
      setIsUploadingVerification(false);
    }
  };

  return (
    <Box
      px={{ xs: 1.5, sm: 3, md: 4 }}
      py={{ xs: 2, md: 3 }}
      maxWidth="1400px"
      mx="auto"
    >
      <Grid2 container spacing={3} direction="column">
        <Grid2>
          <AnimatedGridItem direction="left">
            <ProfileImageCard
              id={doctor.id + ""}
              imageUrl={doctor.personal_info.image?.url}
              name={doctor.personal_info.fullname}
              onImageChange={handleImageUpload}
              loading={isUploading}
            />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.1}>
            <PersonalInfoCard
              doctor={doctor}
              onUpdate={handleUpdateProfile}
              onRefresh={onRefresh}
              loading={isUpdating}
            />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.2}>
            <ClinicInfoCard
              doctor={doctor}
              onUpdate={handleUpdateProfile}
              loading={isUpdating}
            />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.3}>
            <SpecialtiesCard
              doctor={doctor}
              onUpdate={handleUpdateProfile}
              loading={isUpdating}
            />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.4}>
            <AvailableSlotsCard token={token} />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.5}>
            <VerificationCard
              verifications={doctor.verification}
              onUploadVerification={handleUploadVerification}
              isUploading={isUploadingVerification}
            />
          </AnimatedGridItem>
        </Grid2>
      </Grid2>
    </Box>
  );
};
