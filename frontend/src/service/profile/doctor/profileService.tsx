// services/doctor/doctorService.ts
import { Doctor } from "@/types/doctor";
import { signIn } from "next-auth/react";
import credentials from "next-auth/providers/credentials";
import { createApiClient } from "@/lib/strapiClient";
import { handleServiceError } from "@/lib/error";

export const DoctorService = {
  async getDoctorProfile(token: string): Promise<Doctor> {
    try {
      const api = createApiClient(token);
      const response = await api.get<{ data: Doctor }>("/api/doctor/profile");
      return response.data.data;
    } catch (error) {
      handleServiceError(error, "Failed to fetch doctor profile");
    }
  },

  async updateDoctorProfile(
    token: string,
    doctorData: Partial<
      Pick<Doctor, "personal_info" | "city" | "biography" | "experience">
    >
  ): Promise<Doctor> {
    try {
      const api = createApiClient(token);
      const response = await api.put<{ data: Doctor }>("/api/doctor/profile", {
        data: doctorData,
      });
      return response.data.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to update profile");
    }
  },

  async uploadDoctorImage(
    token: string,
    imageFile: File
  ): Promise<Doctor["personal_info"]["image"]> {
    try {
      const api = createApiClient(token);
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await api.post<{
        data: Doctor["personal_info"]["image"];
      }>("/api/doctor/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 20000,
      });

      await signIn("credentials", { redirect: false, ...credentials });
      return response.data.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to upload image");
    }
  },

  async uploadVerification(
    token: string,
    file: File,
    type: string
  ): Promise<void> {
    try {
      const api = createApiClient(token);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      await api.post("/api/doctor/verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 20000,
      });
    } catch (error) {
      throw handleServiceError(error, "Failed to upload verification document");
    }
  },
};
