// ListView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { Appointment } from "@/types/appointments";

export const ListView = ({ appointments }: { appointments: Appointment[] }) => (
  <AppointmentListView
    appointments={appointments}
    emptyMessage="No appointments found."
  />
);
