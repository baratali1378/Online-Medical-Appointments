import { fetchData, postData } from "@/lib/strapiClient";
import {
  DoctorSignupFormValues,
  SignUpResonpose,
  DoctorDetailsResponse,
  DoctorListItem,
} from "@/types/doctor";

export async function signUp(data: DoctorSignupFormValues) {
  return postData<SignUpResonpose>("/doctors/signup", data);
}

export async function getDoctor(doctorId: number | string) {
  return fetchData<DoctorDetailsResponse>(`/doctors/${doctorId}`);
}

export async function getDoctorList(): Promise<DoctorListItem[]> {
  return fetchData<DoctorListItem[]>("/doctors/reviews/top-ranks");
}
