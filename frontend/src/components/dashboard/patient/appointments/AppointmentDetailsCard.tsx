import { Box, Typography, Stack, Avatar, Chip, Paper } from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  MedicalServices,
} from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { PatientAppointment } from "@/types/appointments";

const statusColors = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "error",
} as const;

export const AppointmentDetailsCard = ({
  appointment,
  imageUrl,
}: {
  appointment: PatientAppointment;
  imageUrl: string;
}) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
      Current Appointment
    </Typography>

    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={imageUrl}
          alt={appointment.doctor.fullname}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Dr. {appointment.doctor.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appointment.doctor.specialty}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Box display="flex" alignItems="center">
          <CalendarToday color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography>
            {format(parseISO(appointment.date), "EEEE, MMMM d, yyyy")}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <AccessTime color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography>
            {format(parseISO(appointment.date), "h:mm a")}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <MedicalServices color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
          <Chip
            label={appointment.appointment_status}
            color={statusColors[appointment.appointment_status]}
            size="small"
            sx={{
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />
        </Box>
      </Stack>
    </Stack>
  </Paper>
);
