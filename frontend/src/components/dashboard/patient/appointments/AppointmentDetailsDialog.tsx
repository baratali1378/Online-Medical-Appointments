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

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface Props {
  open: boolean;
  onClose: () => void;
  appointment: PatientAppointment;
  token: string;
}

export const AppointmentDetailsDialog = ({
  open,
  onClose,
  appointment,
  token,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const changeStatusMutation = useChangePatientAppointmentStatus(token);

  // Check if appointment is pending
  const canReschedule = appointment.appointment_status === "Pending";

  // Fetch available slots
  const { data: availableSlots, isLoading: slotsLoading } =
    usePatientAvailableSlotsQuery(appointment.doctor.id, token);

  // Reschedule logic
  const {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    slotsByDay,
    filteredSlots,
  } = useAppointmentReschedule(appointment.date, availableSlots?.data);

  const handleReschedule = () => {
    if (!canReschedule || !selectedSlot) return; // Block non-pending reschedules

    changeStatusMutation.mutate({
      id: appointment.id,
      status: "Pending",
      date: selectedDate,
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
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          bgcolor: "#71C9CE",
          color: theme.palette.primary.contrastText,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
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

      <DialogContent dividers sx={{ px: 4, py: 3 }}>
        <Grid container spacing={4}>
          {/* Current Appointment */}
          <Grid item xs={12} md={5}>
            <AppointmentDetailsCard
              appointment={appointment}
              imageUrl={API_URL + "" + appointment.doctor?.image}
            />
          </Grid>

          {/* Reschedule Section */}
          <Grid item xs={12} md={7}>
            {canReschedule ? (
              <>
                <TimeSlotSelector
                  slotsByDay={slotsByDay}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  isLoading={slotsLoading}
                  onDateChange={setSelectedDate}
                  onSlotSelect={setSelectedSlot}
                />

                {/* Action Buttons */}
                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ px: 4, py: 1, borderRadius: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleReschedule}
                    disabled={!selectedSlot}
                    sx={{
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Confirm Reschedule
                  </Button>
                </Box>
              </>
            ) : (
              <Box mt={2}>
                <Alert severity="warning" variant="filled">
                  This appointment cannot be rescheduled because it is{" "}
                  {appointment.appointment_status.toLowerCase()}.
                </Alert>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
