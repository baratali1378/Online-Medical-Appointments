import { Grid, CircularProgress, Typography } from "@mui/material";
import { PatientAppointment, ViewMode } from "@/types/appointments";
import { PatientAppointmentCard } from "./AppointmentCard";

interface Props {
  appointments: PatientAppointment[];
  loading: boolean;
  selectedView: ViewMode;
  token: string;
}

export function AppointmentViews({
  appointments,
  loading,
  selectedView,
  token,
}: Props) {
  if (loading) {
    return <CircularProgress />;
  }

  if (!appointments.length) {
    return <Typography>No appointments found.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {appointments.map((appt) => (
        <Grid item xs={12} md={6} lg={4} key={appt.id}>
          <PatientAppointmentCard token={token} appointment={appt} />
        </Grid>
      ))}
    </Grid>
  );
}
