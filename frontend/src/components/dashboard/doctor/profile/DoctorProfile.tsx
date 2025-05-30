"use client";

import { Alert, Box, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import { Doctor } from "@/types/doctor";
import { ProfileImageCard } from "../../common/ProfileImageCard";
import { PersonalInfoCard } from "./PersonalInfo";
import { SpecialtiesCard } from "./specialty/SpecialtyCard";
import { AvailableSlotsCard } from "./timeSlots/AvailableSlotsCard";
import { AnimatedGridItem } from "@/components/common/AnimatedGridItem"; // <-- Import animation component
import { VerificationCard } from "./verification/VerificationCard";
import { ClinicInfoCard } from "./clinic_info/ClinicInfoCard";

interface DoctorProfileViewProps {
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  onUploadVerification: (file: File, type: string) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export const DoctorProfileView = ({
  doctor,
  onUpdate,
  onImageUpload,
  onRefresh,
  onUploadVerification,
}: DoctorProfileViewProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUploadingVerification, setIsUploadingVerification] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleUpdateProfile = async (data: Partial<Doctor>) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);
      await onUpdate(data);
      setSuccessMessage("Profile updated successfully!");
      await onRefresh();
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onImageUpload(file);
      setSuccessMessage("Profile image updated successfully!");
      await onRefresh();
    } catch (error: any) {
      setUpdateError(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadVerification = async (file: File, type: string) => {
    try {
      console.log("Uploading file:", file, "of type:", type);
      setIsUploadingVerification(true);
      setVerificationError(null);
      await onUploadVerification(file, type);
      setSuccessMessage("Verification document uploaded successfully!");
      await onRefresh();
    } catch (error: any) {
      setVerificationError(
        error.message || "Failed to upload verification document"
      );
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
      {!doctor.is_verified && (
        <Box mb={2}>
          <Alert severity="warning">
            Your profile is not verified yet. Please contact the admin or
            complete your profile to proceed with verification.
          </Alert>
        </Box>
      )}
      {showSuccess && successMessage && (
        <Box mb={2}>
          <Alert severity="success">{successMessage}</Alert>
        </Box>
      )}
      {updateError && (
        <Box mb={2}>
          <Alert severity="error">{updateError}</Alert>
        </Box>
      )}

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
            <AvailableSlotsCard
              slots={doctor.available_slots}
              onUpdate={handleUpdateProfile}
              loading={isUpdating}
            />
          </AnimatedGridItem>
        </Grid2>

        <Grid2>
          <AnimatedGridItem direction="left" delay={0.5}>
            <VerificationCard
              verifications={doctor.verification}
              onUploadVerification={handleUploadVerification}
              isUploading={isUploadingVerification}
              uploadError={verificationError}
            />
          </AnimatedGridItem>
        </Grid2>
      </Grid2>
    </Box>
  );
};
