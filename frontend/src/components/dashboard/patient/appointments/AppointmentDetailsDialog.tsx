import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Button,
  Stack,
  TextField,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PatientAppointment } from "@/types/appointments";
import { format } from "date-fns";
import { useState } from "react";
import { useChangePatientAppointmentStatus } from "@/hooks/profile/patient/appointment/useChangeAppointmentStatus";

const statusColors = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "default",
} as const;

interface Props {
  open: boolean;
  onClose: () => void;
  appointment: PatientAppointment;
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const AppointmentDetailsDialog = ({
  open,
  onClose,
  appointment,
  token,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const changeStatusMutation = useChangePatientAppointmentStatus(token);

  const [newDate, setNewDate] = useState(appointment.date);

  const handleReschedule = () => {
    changeStatusMutation.mutate({
      id: appointment.id,
      status: "Pending", // keep status pending when rescheduling
    });
    // API call to update date should be added here
    onClose();
  };

  if (!appointment) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Appointment Details
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Stack spacing={3}>
          {/* Doctor Info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={API_URL + "" + appointment.doctor?.image}
              alt={appointment.doctor.fullname}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Dr. {appointment.doctor.fullname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appointment.doctor.email}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Status */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={appointment.appointment_status}
              color={statusColors[appointment.appointment_status]}
              size="small"
            />
          </Stack>

          {/* Appointment Date + Reschedule */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Appointment Date
            </Typography>
            <TextField
              type="datetime-local"
              fullWidth
              size="small"
              value={format(new Date(newDate), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <Button variant="outlined" onClick={handleReschedule}>
              Reschedule
            </Button>
          </Stack>

          {/* Notes */}
          {appointment.notes && (
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body2">{appointment.notes}</Typography>
            </Stack>
          )}

          {/* Cancel Button */}
          {appointment.appointment_status === "Pending" && (
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                changeStatusMutation.mutate({
                  id: appointment.id,
                  status: "Cancelled",
                })
              }
            >
              Cancel Appointment
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
