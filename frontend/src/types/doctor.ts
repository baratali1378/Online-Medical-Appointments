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
  phone_number: PhoneNumber[];
  city?: City;
  specialties: Specialty[];
  available_slots: AvailableSlot[];
  verification: VerificationDocument[];
}

export interface PersonalInfo {
  fullname: string;
  email: string;
  image?: Media;
}

export interface PhoneNumber {
  countryCode: string;
  text: string;
  label?: "mobile" | "work" | "home";
}

export interface City {
  id: number;
  name: string;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface AvailableSlot {
  day: string;
  start_time: string; // HH:mm format
  end_time: string;
}

export interface VerificationDocument {
  id: number;
  type: string;
  status: "pending" | "approved" | "rejected";
  file: Media;
}

export interface Media {
  id: number;
  url: string;
  name: string;
  mime: string;
}
