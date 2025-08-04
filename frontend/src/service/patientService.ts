import { postData } from "@/lib/strapiClient";
import {
  ApiPatientResponse,
  PatientSignupResponse,
  SignupFormValues,
} from "@/types/patient";
import { createApiClient } from "@/lib/strapiClient";
import { ApiPatientListResponse } from "@/types/patient";

export async function signUp(data: SignupFormValues) {
  return postData<PatientSignupResponse>("/patients/signup", data);
}

export async function fetchDoctorPatients(
  token: string
): Promise<ApiPatientListResponse> {
  const client = createApiClient(token);
  const { data } = await client.get<ApiPatientListResponse>(
    "/api/doctor/patients"
  );
  return data;
}

export async function fetchPatientById(
  token: string,
  patientId: number | string
): Promise<ApiPatientResponse> {
  const client = createApiClient(token);
  const { data } = await client.get<ApiPatientResponse>(
    `/api/doctor/patients/${patientId}`
  );
  return data;
}
