import { Appointment, DoctorAppointment, ViewMode } from "@/types/appointments";
import { AppointmentSkeleton } from "./views/AppointmentSkeleton";
import { viewFactory } from "./views/ViewFactory";

interface Props {
  appointments: DoctorAppointment[];
  selectedView: ViewMode;
  loading?: boolean;
  token: string;
}

export const AppointmentViews = ({
  appointments,
  selectedView,
  loading = false,
  token,
}: Props) => {
  if (loading) {
    // Show 5 skeleton cards
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <AppointmentSkeleton key={i} />
        ))}
      </>
    );
  }

  return <>{viewFactory(selectedView, appointments, token)}</>;
};
