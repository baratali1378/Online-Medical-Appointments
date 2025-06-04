import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Appointment } from "@/types/appointments";
import { format } from "date-fns";
import { useState } from "react";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { useChangeAppointmentStatus } from "@/hooks/profile/doctor/appointment/useChangeAppointmentStatus";

// Helper to darken colors (import from @mui/system or use your own)
import { darken } from "@mui/material";

interface AppointmentCardProps {
  appointment: Appointment;
  token: string;
}

const statusColors: Record<string, any> = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "default",
};

// Reusable ActionButton component
const ActionButton = ({
  label,
  onClick,
  color,
  loading,
  fullWidth,
}: {
  label: string;
  onClick?: () => void;
  color?: string;
  loading?: boolean;
  fullWidth?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Button
      size="small"
      variant="contained"
      onClick={onClick}
      disabled={loading}
      fullWidth={fullWidth}
      sx={{
        backgroundColor: color || theme.palette.primary.main,
        color: "#fff",
        "&:hover": {
          backgroundColor: color
            ? darken(color, 0.15)
            : theme.palette.primary.dark,
        },
        whiteSpace: "nowrap",
      }}
    >
      {loading ? <CircularProgress size={18} color="inherit" /> : label}
    </Button>
  );
};

// Patient info display
const PatientInfo = ({
  patient,
  apiUrl,
}: {
  patient: Appointment["patient"];
  apiUrl: string | undefined;
}) => {
  const age =
    new Date().getFullYear() - new Date(patient.birth || "2000").getFullYear();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src={
          patient.image?.url
            ? `${apiUrl}${patient.image.url}`
            : "/default-avatar.png"
        }
        alt={patient.fullname || "Patient"}
        sx={{ width: 48, height: 48 }}
      />
      <Box>
        <Typography fontWeight={600} variant="body1">
          {patient.fullname || "Unnamed"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {age} yrs • {patient.gender || "N/A"}
        </Typography>
      </Box>
    </Stack>
  );
};

// Appointment status display
const AppointmentStatus = ({
  date,
  status,
  isMobile,
}: {
  date: string;
  status: string;
  isMobile: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "flex-end",
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
        {format(
          new Date(date),
          isMobile ? "MMM dd, HH:mm" : "MMM dd, yyyy HH:mm"
        )}
      </Typography>
      <Chip
        label={status}
        color={statusColors[status] || "default"}
        size="small"
        sx={{
          minWidth: 80,
          fontWeight: 500,
        }}
      />
    </Box>
  );
};

// Appointment action buttons
const AppointmentActions = ({
  status,
  onChangeStatus,
  isLoading,
  isMobile,
}: {
  status: string;
  onChangeStatus: (newStatus: string) => void;
  isLoading: boolean;
  isMobile: boolean;
}) => {
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={1}
      sx={{ width: isMobile ? "100%" : "auto", mt: isMobile ? 1 : 0 }}
    >
      {status === "Pending" && (
        <ActionButton
          label="Confirm"
          onClick={() => onChangeStatus("Confirmed")}
          color="#FFA000"
          loading={isLoading}
          fullWidth={isMobile}
        />
      )}

      {status === "Confirmed" && (
        <>
          <ActionButton
            label="Cancel"
            onClick={() => onChangeStatus("Cancelled")}
            color="#D32F2F"
            loading={isLoading}
            fullWidth={isMobile}
          />
          <ActionButton label="Start" color="#2E7D32" fullWidth={isMobile} />
        </>
      )}
    </Stack>
  );
};

export const AppointmentCard = ({
  appointment,
  token,
}: AppointmentCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDetails, setOpenDetails] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const changeStatusMutation = useChangeAppointmentStatus(token);

  const handleStatusChange = (newStatus: string) => {
    changeStatusMutation.mutate({ id: appointment.id, status: newStatus });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
          >
            <PatientInfo patient={appointment.patient} apiUrl={API_URL} />

            <AppointmentStatus
              date={appointment.date}
              status={appointment.appointment_status}
              isMobile={isMobile}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: isMobile ? "wrap" : "nowrap",
                justifyContent: isMobile ? "center" : "flex-start",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDetails(true)}
                fullWidth={isMobile}
                sx={{ whiteSpace: "nowrap" }}
              >
                Details
              </Button>

              <AppointmentActions
                status={appointment.appointment_status}
                onChangeStatus={handleStatusChange}
                isLoading={changeStatusMutation.isPending}
                isMobile={isMobile}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <AppointmentDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        appointment={appointment}
      />
    </>
  );
};
