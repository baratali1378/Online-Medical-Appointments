// ListView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { DoctorAppointment } from "@/types/appointments";

export const ListView = ({
  appointments,
  token,
}: {
  appointments: DoctorAppointment[];
  token: string;
}) => (
  <AppointmentListView
    appointments={appointments}
    token={token}
    emptyMessage="No appointments found."
  />
);
