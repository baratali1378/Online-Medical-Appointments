export interface Patient {
  birth: string;
  id: number;
  fullname: string;
  gender?: string;
  image?: {
    url: string;
  };
}

// types/doctor.ts
export interface Doctor {
  id: number;
  fullname: string;
  email: string;
  image?: {
    url: string;
  };
}

export type ViewMode = "Day View" | "Week View" | "List View";

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface Appointment {
  id: number;
  date: string;
  notes: string;
  appointment_status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
}

export interface AppointmentFilters {
  status?: AppointmentStatus | "All";
  dateRange?: { start: string; end: string };
  search?: string;
}

export interface AppointmentsResponse {
  data: Appointment[];
  doctor: Doctor;
  meta: {
    count: number;
    filters: Record<string, unknown>;
  };
}
