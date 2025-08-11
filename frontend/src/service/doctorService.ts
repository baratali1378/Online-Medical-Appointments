import { fetchData, postData } from "@/lib/strapiClient";
import {
  DoctorSignupFormValues,
  SignUpResonpose,
  DoctorDetailsResponse,
} from "@/types/doctor";

export async function signUp(data: DoctorSignupFormValues) {
  return postData<SignUpResonpose>("/doctors/signup", data);
}

export async function getDoctor(doctorId: number | string) {
  return fetchData<DoctorDetailsResponse>(`/doctors/${doctorId}`);
}
