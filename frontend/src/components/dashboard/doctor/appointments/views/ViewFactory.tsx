import { Appointment, ViewMode } from "@/types/appointments";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { ListView } from "./ListView";
import { JSX } from "react";

export const viewFactory = (
  view: ViewMode,
  appointments: Appointment[]
): JSX.Element => {
  switch (view) {
    case "Day View":
      return <DayView appointments={appointments} />;
    case "Week View":
      return <WeekView appointments={appointments} />;
    case "List View":
    default:
      return <ListView appointments={appointments} />;
  }
};
