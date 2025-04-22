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
