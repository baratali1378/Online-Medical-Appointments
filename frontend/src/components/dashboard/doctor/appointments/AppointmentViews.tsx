import { Appointment, ViewMode } from "@/types/appointments";
import { AppointmentSkeleton } from "./views/AppointmentSkeleton";
import { viewFactory } from "./views/ViewFactory";

interface Props {
  appointments: Appointment[];
  selectedView: ViewMode;
  loading?: boolean;
}

export const AppointmentViews = ({
  appointments,
  selectedView,
  loading = false,
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

  return <>{viewFactory(selectedView, appointments)}</>;
};
