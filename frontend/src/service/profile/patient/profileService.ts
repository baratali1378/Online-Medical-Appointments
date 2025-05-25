// service/profile/patient/profileService.ts
import axios, { AxiosError } from "axios";
import {
  PatientProfile,
  PatientImage,
  PatientProfileFormValues,
} from "@/types/patient";
import { signIn } from "next-auth/react";
import credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export class PatientServiceError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = "PatientServiceError";
    this.status = status;
    this.details = details;
  }
}

export const PatientService = {
  async getPatientProfile(token: string): Promise<PatientProfile> {
    try {
      const response = await axios.get<{ data: PatientProfile }>(
        `${API_URL}/api/patient/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000, // 10 seconds timeout
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new PatientServiceError(
          error.response?.data?.message || "Failed to fetch patient profile",
          error.response?.status,
          error.response?.data
        );
      }
      throw new PatientServiceError("Network error occurred");
    }
  },

  async updatePatientProfile(
    token: string,
    patientData: Partial<PatientProfileFormValues>
  ): Promise<PatientProfile> {
    try {
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

      const response = await axios.put<{ data: PatientProfile }>(
        `${API_URL}/api/patient/me`,
        { data: requestData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000, // 15 seconds timeout for updates
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new PatientServiceError(
          error.response?.data?.message || "Failed to update profile",
          error.response?.status,
          error.response?.data
        );
      }
      throw new PatientServiceError("Network error during update");
    }
  },

  async uploadPatientImage(
    token: string,
    imageFile: File
  ): Promise<PatientImage> {
    try {
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await axios.post<{ data: PatientImage }>(
        `${API_URL}/api/patient/img`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 20000, // 20 seconds timeout for file uploads
        }
      );
      await signIn("credentials", { redirect: false, ...credentials });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error.message);
      }
      throw new PatientServiceError("Network error during image upload");
    }
  },
};
