// DayView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { Appointment } from "@/types/appointments";

export const DayView = ({
  appointments,
  token,
}: {
  appointments: Appointment[];
  token: string;
}) => (
  <AppointmentListView
    appointments={appointments}
    token={token}
    emptyMessage="No appointments for today."
  />
);
