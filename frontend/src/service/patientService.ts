import { postData } from "@/lib/strapiClient";
import { PatientSignupResponse, SignupFormValues } from "@/types/patient";

export async function signUp(data: SignupFormValues) {
  return postData<PatientSignupResponse>("/patients/signup", data);
}
