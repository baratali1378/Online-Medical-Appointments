import axios from "axios";
import { DoctorSearchResult } from "@/types/search";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function searchDoctors(params?: {
  city?: string;
  specialty?: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}): Promise<DoctorSearchResult> {
  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  try {
    const response = await axios.get<DoctorSearchResult>(
      `${API_URL}/api/doctors/search${queryString}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch doctors with params: ${queryString}`
    );
  }
}
