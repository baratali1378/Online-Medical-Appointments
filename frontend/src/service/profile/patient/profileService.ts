// service/profile/patient/profileService.ts
import axios from "axios";
import {
  PatientProfile,
  PatientImage,
  SignupFormValues,
} from "@/types/patient";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const PatientService = {
  async getPatientProfile(token: string): Promise<PatientProfile> {
    const response = await axios.get<{ data: PatientProfile; meta: any }>(
      `${API_URL}/api/patient/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  },

  async updatePatientProfile(
    token: string,
    patientData: Partial<SignupFormValues>
  ): Promise<PatientProfile> {
    const response = await axios.put<{ data: PatientProfile; meta: any }>(
      `${API_URL}/api/patient/me`,
      { data: patientData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  },

  async uploadPatientImage(
    token: string,
    imageFile: File
  ): Promise<PatientImage> {
    const formData = new FormData();
    formData.append("files", imageFile);

    const response = await axios.post<{ data: PatientImage; meta: any }>(
      `${API_URL}/api/patient/img`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },
};
