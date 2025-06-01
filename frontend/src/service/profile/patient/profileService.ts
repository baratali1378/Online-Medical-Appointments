// service/profile/patient/profileService.ts
import {
  PatientProfile,
  PatientImage,
  PatientProfileFormValues,
} from "@/types/patient";
import { signIn } from "next-auth/react";
import credentials from "next-auth/providers/credentials";
import { createApiClient } from "@/lib/strapiClient";
import { handleServiceError } from "@/lib/error";

export const PatientService = {
  async getPatientProfile(token: string): Promise<PatientProfile> {
    try {
      const api = createApiClient(token); // 10s timeout
      const response = await api.get<{ data: PatientProfile }>(
        "/api/patient/me"
      );
      return response.data.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to fetch patient profile");
    }
  },

  async updatePatientProfile(
    token: string,
    patientData: Partial<PatientProfileFormValues>
  ): Promise<PatientProfile> {
    try {
      const api = createApiClient(token); // 15s timeout
      const requestData = {
        personal_info: {
          fullname: patientData.fullname,
          email: patientData.email,
          gender: patientData.gender,
          birth: patientData.birth,
        },
        contact: {
          phone_number: patientData.phone_number,
          city: patientData.city,
          address: patientData.address ?? null,
          postal_code: patientData.postal_code ?? null,
        },
      };

      const response = await api.put<{ data: PatientProfile }>(
        "/api/patient/me",
        { data: requestData }
      );
      return response.data.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to update profile");
    }
  },

  async uploadPatientImage(
    token: string,
    imageFile: File
  ): Promise<PatientImage> {
    try {
      const api = createApiClient(token); // 20s timeout
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await api.post<{ data: PatientImage }>(
        "/api/patient/img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await signIn("credentials", { redirect: false, ...credentials });
      return response.data.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to upload image");
    }
  },
};
