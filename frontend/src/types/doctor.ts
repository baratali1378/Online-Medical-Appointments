export interface DoctorSignupFormValues {
  name: string;
  email: string;
  password: string;
  birth?: string | null;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  experience: string;
  biography?: string;
  phone_number: string;
  city: string;
}

export interface SignUpResonpose {
  token: string;
  role: string;
}

export interface Doctor {
  id: number;
  biography?: string;
  experience: string;
  rating?: number;
  personal_info: PersonalInfo;
  city?: City;
  specialties: Specialty[];
  available_slots: AvailableSlot[];
  verification: VerificationDocument[];
  is_verified: boolean;
  clinic_info?: ClinicInfo;
}

export interface PersonalInfo {
  fullname: string;
  email: string;
  image?: Media;
}

export interface City {
  id: number;
  name: string;
}

export interface ClinicInfo {
  clinic_name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface AvailableSlot {
  id?: number;
  days: string;
  start_time: string; // HH:mm format
  end_time: string;
}

export interface VerificationDocument {
  id: number;
  type: string;
  file: {
    url?: string;
  };
  current_status: "pending" | "approved" | "rejected";
  uploaded_at: string;
}

export interface Media {
  id: number;
  url: string;
  name: string;
  mime: string;
}
