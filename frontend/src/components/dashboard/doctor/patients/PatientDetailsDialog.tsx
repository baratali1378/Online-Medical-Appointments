"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  IconButton,
  Stack,
  Divider,
  Tabs,
  Tab,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import EventIcon from "@mui/icons-material/Event";
import { ApiPatient } from "@/types/patient";
import { useRouter } from "next/navigation";

interface PatientDetailsDialogProps {
  open: boolean;
  patient: ApiPatient | null;
  apiUrl: string;
  onClose: () => void;
}

export const PatientDetailsDialog: React.FC<PatientDetailsDialogProps> = ({
  open,
  patient,
  apiUrl,
  onClose,
}) => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const router = useRouter();

  if (!patient) return null;

  const { personal_info, contact_details } = patient;
  const avatarSrc = personal_info.image?.url
    ? `${apiUrl}${personal_info.image.url}`
    : undefined;

  // Handlers for buttons
  const handleViewMedicalRecords = (patientId: string | number) => {};

  const handleViewAppointments = (patientId: string | number) => {
    console.log("View appointments for", patientId);
    // Could navigate to /patients/[id]/appointments or open another dialog
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header with Close X */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={avatarSrc}
            sx={{
              width: 56,
              height: 56,
              bgcolor: theme.palette.primary.main,
              fontSize: 20,
            }}
          >
            {personal_info.fullname.charAt(0)}
          </Avatar>
          <Typography variant="h6">{personal_info.fullname}</Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tab label="Overview" />
        <Tab label="Personal Info" />
        <Tab label="Contact Info" />
      </Tabs>

      {/* Tab Content */}
      <DialogContent dividers>
        {tab === 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Email: {personal_info.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {contact_details.phone_number || "—"}
            </Typography>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Full Name: {personal_info.fullname}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Gender: {(personal_info as any).gender || "—"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Date of Birth: {(personal_info as any).birth || "—"}
            </Typography>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Email: {personal_info.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {contact_details.phone_number || "—"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Postal Code: {contact_details.postal_code || "—"}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Divider />

      {/* Action Buttons */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MedicalInformationIcon />}
            onClick={() => {
              router.push(
                `/dashboard/doctor/patients/${patient.id}/medical-records`
              );
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Medical Records
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EventIcon />}
            onClick={() => {
              router.push(
                `/dashboard/doctor/patients/${patient.id}/appointments`
              );
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Appointments
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
