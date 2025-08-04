"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ApiPatient } from "@/types/patient";

interface PatientCardProps {
  patient: ApiPatient;
  apiUrl: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  apiUrl,
}) => {
  const theme = useTheme();
  const { personal_info, contact_details } = patient;

  const avatarSrc = personal_info.image?.url
    ? `${apiUrl}${personal_info.image.url}`
    : undefined;

  // Dialog state
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <>
      {/* Patient Card */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: 2,
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
            backgroundColor: theme.palette.action.hover,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={avatarSrc}
            sx={{ bgcolor: "primary.main", width: 56, height: 56 }}
          >
            {personal_info.fullname.charAt(0)}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="bold">
              {personal_info.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personal_info.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {(contact_details as any).city || "—"}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Patient Detail Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, overflow: "hidden" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={avatarSrc} sx={{ bgcolor: "secondary.main" }}>
              {personal_info.fullname.charAt(0)}
            </Avatar>
            <Typography variant="h6">{personal_info.fullname}</Typography>
          </Stack>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "inherit" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Personal Info" />
          <Tab label="Contact Info" />
          <Tab label="Medical History" />
        </Tabs>

        <Divider />

        <DialogContent sx={{ minHeight: 200 }}>
          {tab === 0 && (
            <Stack spacing={2}>
              <Typography>
                <b>Name:</b> {personal_info.fullname}
              </Typography>
              <Typography>
                <b>Email:</b> {personal_info.email}
              </Typography>
              <Typography>
                <b>Gender:</b> {(personal_info as any).gender || "—"}
              </Typography>
              <Typography>
                <b>Date of Birth:</b> {(personal_info as any).dob || "—"}
              </Typography>
            </Stack>
          )}
          {tab === 1 && (
            <Stack spacing={2}>
              <Typography>
                <b>Phone:</b> {contact_details.phone_number || "—"}
              </Typography>
              <Typography>
                <b>City:</b> {(contact_details as any).city || "—"}
              </Typography>
              <Typography>
                <b>Address:</b> {(contact_details as any).address || "—"}
              </Typography>
            </Stack>
          )}
          {tab === 2 && (
            <Typography color="text.secondary">
              Medical history details will be added here in the future.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
