export const genderOptions = ["Male", "Female", "Other"] as const;
export type Gender = (typeof genderOptions)[number];

export interface SignupFormValues {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  gender: Gender | "";
  birth: string;
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

export interface PatientProfile {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  birth: string;
  gender: "Male" | "Female" | "Other";
  slug_id: string | null;
  image: PatientImage | null;
}
