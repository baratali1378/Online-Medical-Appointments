"use client";

import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Chip,
  Box,
  useMediaQuery,
  Theme,
  Stack,
} from "@mui/material";
import { MedicalRecord } from "@/types/medical-record";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CalendarToday, EventAvailable, EventBusy } from "@mui/icons-material";
import { RecordActions } from "./RecordActions";

interface EnhancedRecordRowProps {
  record: MedicalRecord;
  onDelete?: (id: number) => void;
}

export const EnhancedRecordRow: React.FC<EnhancedRecordRowProps> = ({
  record,
  onDelete,
}) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const appointmentDate = record.appointment?.date
    ? dayjs(record.appointment.date).format("DD MMM YYYY")
    : "—";
  const followUpDate = record.follow_up_date
    ? dayjs(record.follow_up_date).format("DD MMM YYYY")
    : "—";

  const patient = record.patient?.personal_info;
  const avatarSrc = patient?.image?.url ? `${API_URL}${patient.image.url}` : "";

  if (isMobile) {
    return (
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          backgroundColor: "#A6E3E9", // fixed mobile background color
          boxShadow: 2,
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
          },
        }}
        onClick={() =>
          router.push(`/dashboard/doctor/medical-records/${record.id}`)
        }
      >
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar sx={{ bgcolor: "#71C9CE" }} src={avatarSrc}>
            {patient?.fullname?.charAt(0)}
          </Avatar>
          <Box>
            <Typography fontWeight="bold">{patient?.fullname}</Typography>
            <Typography variant="caption" color="text.secondary">
              📅 {appointmentDate}
            </Typography>
          </Box>
        </Box>

        <Box mt={1}>
          <Typography variant="subtitle2">Follow-up</Typography>
          {record.follow_up_required ? (
            <Chip
              label={`Due: ${followUpDate}`}
              color="warning"
              size="small"
              icon={<EventAvailable fontSize="small" />}
            />
          ) : (
            <Chip
              label="None"
              color="default"
              size="small"
              icon={<EventBusy fontSize="small" />}
            />
          )}
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            Created: {dayjs(record.createdAt).format("DD MMM YYYY")}
          </Typography>
          <RecordActions
            recordId={record.id}
            patientId={record.patient.id || 0}
            onDelete={onDelete}
          />
        </Box>
      </Box>
    );
  }

  return (
    <TableRow
      hover
      sx={{
        cursor: "pointer",
        "&:last-child td": { borderBottom: 0 },
        "&:hover": { backgroundColor: "action.hover" },
      }}
      onClick={() =>
        router.push(`/dashboard/doctor/medical-records/${record.id}`)
      }
    >
      <TableCell sx={{ py: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }} src={avatarSrc}>
            {patient?.fullname?.charAt(0)}
          </Avatar>
          <Typography fontWeight="medium">{patient?.fullname}</Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarToday color="action" fontSize="small" />
          <Typography>{appointmentDate}</Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography color="text.secondary">
          {dayjs(record.createdAt).format("DD MMM YYYY")}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>{record.chief_complaint || "—"}</Typography>
      </TableCell>

      <TableCell>
        {record.follow_up_required ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <EventAvailable color="success" fontSize="small" />
            <Typography color="success.main">{followUpDate}</Typography>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <EventBusy color="disabled" fontSize="small" />
            <Typography color="text.disabled">None</Typography>
          </Stack>
        )}
      </TableCell>

      <TableCell>
        <RecordActions
          recordId={record.id}
          patientId={record.patient.id || 0}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};
