// components/AppointmentDetailsDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DoctorAppointment } from "@/types/appointments";
import { format } from "date-fns";

interface Props {
  open: boolean;
  onClose: () => void;
  appointment: DoctorAppointment | null;
}

const statusColors: Record<
  string,
  "default" | "success" | "warning" | "info" | "error"
> = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "default",
};

export const AppointmentDetailsDialog = ({
  open,
  onClose,
  appointment,
}: Props) => {
  const theme = useTheme();
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!appointment) return null;

  const { patient, date, notes, appointment_status } = appointment;

  const age =
    new Date().getFullYear() - new Date(patient.birth || "2000").getFullYear();

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
        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <Avatar
            src={`${API_URL}${patient.image?.url}` || "/default-avatar.png"}
            alt={patient.fullname}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {patient.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {age} years • {patient.gender || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
          <Chip
            label={appointment_status}
            color={statusColors[appointment_status] || "default"}
            size="small"
            sx={{ mt: 0.5 }}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Appointment Date
          </Typography>
          <Typography variant="body1">
            {format(new Date(date), "MMMM dd, yyyy HH:mm")}
          </Typography>
        </Box>

        {notes && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Notes
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {notes}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
