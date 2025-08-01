"use client";

import React from "react";
import { useParams } from "next/navigation";
import { withAuth } from "@/components/dashboard/withAuth";
import { usePatientMedicalRecordDetailQuery } from "@/hooks/profile/patient/useMedicalRecordQuery";

import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Avatar,
  Link as MuiLink,
} from "@mui/material";
import {
  MedicalInformation,
  CalendarToday,
  EventAvailable,
  EventBusy,
  Description,
} from "@mui/icons-material";
import dayjs from "dayjs";

import InfoSection from "@/components/dashboard/common/InfoSection";
import DoctorCard from "@/components/dashboard/common/DoctorCard";

type Props = {
  session: any;
};

const formatDate = (date?: string | null) =>
  date ? dayjs(date).format("MMM D, YYYY") : "—";

const MedicalRecordPage = ({ session }: Props) => {
  const params = useParams();
  const recordId = params?.id as string;
  const token = session?.user?.token || "";

  const { data, isLoading, isError, error } =
    usePatientMedicalRecordDetailQuery({
      token: token || "",
      recordId,
    });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={4} textAlign="center" color="error.main">
        <Typography variant="h6">Error loading record</Typography>
        <Typography variant="body2">{error?.message}</Typography>
      </Box>
    );
  }

  const record = data?.data;
  if (!record) {
    return (
      <Box mt={4} textAlign="center">
        <Typography variant="h6">Record not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            <MedicalInformation />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {record.chief_complaint}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {formatDate(record.createdAt)}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Diagnoses */}
        <Chip
          label={record.diagnoses}
          color="secondary"
          sx={{ width: "fit-content", fontWeight: 500 }}
        />

        {/* Doctor Card */}
        {record.doctor && (
          <DoctorCard
            id={record.doctor.id + ""}
            fullname={record.doctor.personal_info.fullname}
            email={record.doctor.personal_info.email}
          />
        )}

        {/* Appointment */}
        {record.appointment?.date && (
          <Stack direction="row" spacing={1} alignItems="center" mt={2}>
            <CalendarToday color="action" />
            <Typography variant="body2">
              Appointment: {formatDate(record.appointment.date)}
            </Typography>
          </Stack>
        )}

        {/* Follow-up */}
        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
          {record.follow_up_required ? (
            <>
              <EventAvailable
                color={record.follow_up_date ? "success" : "warning"}
              />
              <Typography
                variant="body2"
                color={record.follow_up_date ? "text.primary" : "warning.main"}
              >
                {record.follow_up_date
                  ? `Follow-up: ${formatDate(record.follow_up_date)}`
                  : "Follow-up required (date not set)"}
              </Typography>
            </>
          ) : (
            <>
              <EventBusy color="disabled" />
              <Typography variant="body2">No follow-up required</Typography>
            </>
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Medical Details */}
        <InfoSection title="Symptoms" content={record.symptoms} />
        <InfoSection title="Treatment Plan" content={record.treatment_plan} />
        <InfoSection title="Prescription" content={record.prescription} html />
        <InfoSection title="Notes" content={record.notes} />

        {/* Files Section */}
        {record.files && (
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              Files
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Description color="action" />
              <MuiLink
                href={record.files.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File ({(record.files.size / 1024).toFixed(1)} KB)
              </MuiLink>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default withAuth(MedicalRecordPage, "patient");
