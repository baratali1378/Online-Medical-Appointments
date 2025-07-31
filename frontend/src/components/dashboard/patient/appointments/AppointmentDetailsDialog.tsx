import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PatientAppointment } from "@/types/appointments";
import { usePatientAvailableSlotsQuery } from "@/hooks/profile/doctor/available-slots/useSlotsQuery";
import { useAppointmentReschedule } from "@/hooks/profile/patient/appointment/useAppointmentReschedule";
import { AppointmentDetailsCard } from "./AppointmentDetailsCard";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { useChangePatientAppointmentStatus } from "@/hooks/profile/patient/appointment/useChangeAppointmentStatus";
import { BrandButton } from "../../common/BrandButton";

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
  const canReschedule = appointment.appointment_status === "Pending";

  const { data: availableSlots, isLoading: slotsLoading } =
    usePatientAvailableSlotsQuery(appointment.doctor.id, token);

  const { selectedDate, setSelectedDate, selectedSlot, setSelectedSlot } =
    useAppointmentReschedule(appointment.date, availableSlots?.data);

  const handleReschedule = () => {
    if (!canReschedule || !selectedSlot) return;
    changeStatusMutation.mutate({
      id: appointment.id,
      status: "Pending",
      available_slot: selectedSlot,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          bgcolor: "#71C9CE",
          color: theme.palette.primary.contrastText,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component={"span"} fontWeight={600}>
          Reschedule Appointment
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <AppointmentDetailsCard
              appointment={appointment}
              imageUrl={API_URL + "" + appointment.doctor?.image}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            {canReschedule ? (
              <>
                <TimeSlotSelector
                  slots={availableSlots?.data || []}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  isLoading={slotsLoading}
                  onDateChange={setSelectedDate}
                  onSlotSelect={setSelectedSlot}
                />
                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="outlined" onClick={onClose} color="error">
                    Cancel
                  </Button>
                  <BrandButton
                    variant="contained"
                    onClick={handleReschedule}
                    disabled={!selectedSlot}
                  >
                    Confirm Reschedule
                  </BrandButton>
                </Box>
              </>
            ) : (
              <Alert severity="warning" variant="filled">
                This appointment cannot be rescheduled because it is{" "}
                {appointment.appointment_status.toLowerCase()}.
              </Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
