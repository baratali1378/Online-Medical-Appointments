// WeekView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { Appointment } from "@/types/appointments";

export const WeekView = ({ appointments }: { appointments: Appointment[] }) => (
  <AppointmentListView
    appointments={appointments}
    emptyMessage="No appointments this week."
  />
);
