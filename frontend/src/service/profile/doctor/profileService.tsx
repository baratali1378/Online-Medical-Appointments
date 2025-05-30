import axios, { AxiosError } from "axios";
import { Doctor } from "@/types/doctor";
import { signIn } from "next-auth/react";
import credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export class DoctorServiceError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = "DoctorServiceError";
    this.status = status;
    this.details = details;
  }
}

export const DoctorService = {
  async getDoctorProfile(token: string): Promise<Doctor> {
    try {
      const response = await axios.get<{ data: Doctor }>(
        `${API_URL}/api/doctor/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new DoctorServiceError(
          error.response?.data?.message || "Failed to fetch doctor profile",
          error.response?.status,
          error.response?.data
        );
      }
      throw new DoctorServiceError("Network error occurred");
    }
  },

  async updateDoctorProfile(
    token: string,
    doctorData: Partial<
      Pick<
        Doctor,
        "personal_info" | "phone_number" | "city" | "biography" | "experience"
      >
    >
  ): Promise<Doctor> {
    console.log("token", token);
    try {
      const response = await axios.put<{ data: Doctor }>(
        `${API_URL}/api/doctor/profile`,
        { data: doctorData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000,
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error);
        throw new DoctorServiceError(
          error.response?.data?.error?.message || "Failed to update profile"
        );
      }
      throw new DoctorServiceError("Network error during update");
    }
  },

  async uploadDoctorImage(
    token: string,
    imageFile: File
  ): Promise<Doctor["personal_info"]["image"]> {
    try {
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await axios.post<{
        data: Doctor["personal_info"]["image"];
      }>(`${API_URL}/api/doctor/img`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 20000,
      });
      await signIn("credentials", { redirect: false, ...credentials });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.message || "Upload failed"
        );
      }
      throw new DoctorServiceError("Network error during image upload");
    }
  },
  async uploadVerification(
    token: string,
    file: File,
    type: string
  ): Promise<void> {
    try {
      const formData = new FormData();
      console.log("hhhh");
      formData.append("file", file);
      formData.append("type", type);

      await axios.post(`${API_URL}/api/doctor/verification`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 20000,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new DoctorServiceError(
          error.response?.data?.error?.message ||
            "Failed to upload verification"
        );
      }
      throw new DoctorServiceError("Network error during verification upload");
    }
  },
};
