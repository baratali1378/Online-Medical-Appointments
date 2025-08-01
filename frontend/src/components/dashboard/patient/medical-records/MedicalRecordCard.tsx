"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Paper,
  useTheme,
} from "@mui/material";
import {
  MedicalInformation,
  CalendarToday,
  Person,
  EventAvailable,
  EventBusy,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { MedicalRecordListItem } from "@/types/medical-record";

interface MedicalRecordCardProps {
  record: MedicalRecordListItem;
}

// Helper to format dates consistently
const formatDate = (date?: string | Date) =>
  date ? dayjs(date).format("MMM D, YYYY") : null;

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({ record }) => {
  const theme = useTheme();
  const {
    id,
    chief_complaint,
    diagnoses,
    follow_up_required,
    follow_up_date,
    createdAt,
    doctor,
    appointment,
  } = record;

  const createdAtFormatted = formatDate(createdAt) || "Unknown date";
  const appointmentDateFormatted = formatDate(appointment?.date);
  const followUpDateFormatted = formatDate(follow_up_date || "");

  return (
    <Link
      href={`/dashboard/patient/medical-records/${id}`}
      passHref
      style={{ textDecoration: "none" }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          transition: "all 0.2s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[4],
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <MedicalInformation />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {chief_complaint}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {createdAtFormatted}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={diagnoses}
            color="secondary"
            size="small"
            sx={{ alignSelf: "flex-start" }}
          />

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Person color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {doctor?.personal_info.fullname
                  ? `Dr. ${doctor.personal_info.fullname}`
                  : "Not specified"}
              </Typography>
            </Stack>

            {appointmentDateFormatted && (
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarToday color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Visit: {appointmentDateFormatted}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              {follow_up_required ? (
                <>
                  <EventAvailable
                    color={followUpDateFormatted ? "success" : "warning"}
                    fontSize="small"
                  />
                  <Typography
                    variant="body2"
                    color={
                      followUpDateFormatted
                        ? "text.primary"
                        : theme.palette.warning.main
                    }
                  >
                    {followUpDateFormatted
                      ? `Follow-up scheduled for ${followUpDateFormatted}`
                      : "Follow-up required (date not set)"}
                  </Typography>
                </>
              ) : (
                <>
                  <EventBusy color="disabled" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    No follow-up required
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Link>
  );
};

export default MedicalRecordCard;
