export const genderOptions = ["Male", "Female", "Other"] as const;
export type Gender = (typeof genderOptions)[number];

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
  city: string;
}

export interface PatientImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface PatientImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small?: PatientImageFormat;
    thumbnail?: PatientImageFormat;
  };
  url: string;
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: number;
  name: string;
}

export interface ContactInfo {
  id: number;
  phone_number: string;
  alternate_phone?: string | null;
  address?: string | null;
  postal_code?: string | null;
  city?: City | null;
}

export interface PersonalInfo {
  id: number;
  fullname: string;
  email: string;
  birth?: string | null;
  image?: { url: string } | null;
}

export interface PatientProfile {
  id: number;
  personal_info: PersonalInfo;
  contact: ContactInfo;
  slug_id?: string;
}

export interface PatientFormValues {
  fullname: string;
  email: string;
  phone_number?: string;
  birth?: string;
  gender?: string;
  city?: string;
  password?: string;
}

export interface PatientProfileFormValues extends PatientFormValues {
  address?: string;
  posta_code?: string;
}
export interface PatientSignupResponse {
  token: string;
  role: string;
}
