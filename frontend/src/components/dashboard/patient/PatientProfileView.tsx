// components/dashboard/patient/PatientProfileView.tsx
"use client";

import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import PatientImageCard from "./ProfileImageCard";
import PatientFormCard from "./ProfileFormCard";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { PatientFormValues, PatientProfile } from "@/types/patient";
import { useState, useEffect } from "react";

interface PatientProfileViewProps {
  patient: PatientProfile;
  onUpdate: (data: Partial<PatientFormValues>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  onRefresh: () => Promise<void>;
}

const PatientProfileView = ({
  patient,
  onUpdate,
  onImageUpload,
  onRefresh,
}: PatientProfileViewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Handle success message display and auto-hide
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

  const handleUpdateProfile = async (data: Partial<PatientFormValues>) => {
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

  return (
    <Box
      px={{ xs: 1.5, sm: 3, md: 4 }}
      py={{ xs: 2, md: 3 }}
      maxWidth="1400px"
      mx="auto"
    >
      {showSuccess && successMessage && <div />}

      <Grid container spacing={3} direction={isMobile ? "column" : "row"}>
        <Grid item xs={12} md={4}>
          <PatientImageCard
            patient={patient}
            onImageChange={handleImageUpload}
            loading={isUploading}
            onEditClick={() => setEditMode(true)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <PatientFormCard
            patient={patient}
            onSubmit={handleUpdateProfile}
            loading={isUpdating}
            error={updateError || ""}
            onEditToggle={() => setEditMode(!editMode)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientProfileView;
