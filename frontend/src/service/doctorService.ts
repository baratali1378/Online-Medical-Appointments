import { postData } from "@/lib/strapiClient";
import { DoctorSignupFormValues, SignUpResonpose } from "@/types/doctor";

export async function signUp(data: DoctorSignupFormValues) {
  return postData<SignUpResonpose>("/doctors/signup", data);
}
