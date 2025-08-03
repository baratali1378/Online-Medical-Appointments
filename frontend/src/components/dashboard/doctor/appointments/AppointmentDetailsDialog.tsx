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
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DoctorAppointment } from "@/types/appointments";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { BrandButton } from "../../common/BrandButton";

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
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!appointment) return null;

  const {
    patient,
    date,
    notes,
    appointment_status,
    id: appointmentId,
  } = appointment;

  const age =
    new Date().getFullYear() -
    new Date(patient.personal_info.birth || "2000").getFullYear();

  const canAddMedicalRecord =
    appointment_status === "Completed" || appointment_status === "Confirmed"; // ✅ logic

  const handleAddMedicalRecord = () => {
    router.push(
      `/dashboard/doctor/medical-records/new?patientId=${patient.id}&appointmentId=${appointmentId}`
    );
  };

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
            src={
              `${API_URL}${patient.personal_info.image?.url}` ||
              "/default-avatar.png"
            }
            alt={patient.personal_info.fullname}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {patient.personal_info.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {age} years • {patient.personal_info.gender || "N/A"}
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
          <Box mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Notes
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {notes}
            </Typography>
          </Box>
        )}

        {canAddMedicalRecord && (
          <Box mt={3} textAlign="center">
            <BrandButton variant="text" onClick={handleAddMedicalRecord}>
              Add Medical Records
            </BrandButton>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
