// DayView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { Appointment } from "@/types/appointments";

export const DayView = ({ appointments }: { appointments: Appointment[] }) => (
  <AppointmentListView
    appointments={appointments}
    emptyMessage="No appointments for today."
  />
);
