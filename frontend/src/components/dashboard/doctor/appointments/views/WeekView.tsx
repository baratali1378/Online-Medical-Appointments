// WeekView.tsx
import { AppointmentListView } from "./AppointmentListView";
import { Appointment, DoctorAppointment } from "@/types/appointments";

export const WeekView = ({
  appointments,
  token,
}: {
  appointments: DoctorAppointment[];
  token: string;
}) => (
  <AppointmentListView
    appointments={appointments}
    token={token}
    emptyMessage="No appointments this week."
  />
);
