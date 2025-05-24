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
