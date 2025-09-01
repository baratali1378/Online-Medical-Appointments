export interface Patient {
  id: number;
  personal_info: {
    fullname: string;
    gender?: string;
    birth?: string;
    image?: {
      url: string;
    };
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
  specialty: string;
}

export type ViewMode = "Day View" | "Week View" | "List View";

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type PaymentStatus = "Paid" | "Unpaid" | "Failed";

export interface Appointment {
  id: number;
  date: string;
  notes: string;
  appointment_status: AppointmentStatus;
  payment_status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  price: number | null;
}

export interface DoctorAppointment extends Appointment {
  patient: Patient;
}

export interface PatientAppointment extends Appointment {
  doctor: Doctor;
}
export interface AppointmentFilters {
  status?: AppointmentStatus | "All";
  search?: string;
}

export interface DoctorAppointmentFilters extends AppointmentFilters {
  dateRange?: { start: string; end: string };
}

export interface DoctorAppointmentsResponse {
  data: DoctorAppointment[];
  doctor: Doctor;
  meta: {
    count: number;
    filters: Record<string, unknown>;
  };
}

export interface PatientAppointmentsResponse {
  data: PatientAppointment[];
  meta: {
    count: number;
    filters: Record<string, unknown>;
  };
}

export interface CreateAppointmentPayload {
  doctorId: number;
  slotId: number;
  price: number | null;
  note?: string;
}

export interface CreateAppointmentResponse {
  message: string;
  data: PatientAppointment;
}

export interface StripeCheckoutPayload {
  doctorId: number;
  slotId: number;
  price: number;
}

export interface StripeCheckoutResponse {
  url: string; // Stripe Checkout URL
}
