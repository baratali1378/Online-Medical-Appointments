import { postData } from "@/lib/strapiClient";

export interface PatientPayload {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  gender: "Male" | "Female" | "Other";
  birth?: string;
}

export async function signUp(data: PatientPayload) {
  console.log("hello");
  return postData("/patients/signup", data);
}
