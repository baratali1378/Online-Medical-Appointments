import { Appointment, DoctorAppointment, ViewMode } from "@/types/appointments";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { ListView } from "./ListView";
import { JSX } from "react";

export const viewFactory = (
  view: ViewMode,
  appointments: DoctorAppointment[],
  token: string
): JSX.Element => {
  switch (view) {
    case "Day View":
      return <DayView token={token} appointments={appointments} />;
    case "Week View":
      return <WeekView token={token} appointments={appointments} />;
    case "List View":
    default:
      return <ListView token={token} appointments={appointments} />;
  }
};
