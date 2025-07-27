import axios from "axios";
import {
  DoctorAutocompleteResponse,
  DoctorAutocompleteResult,
} from "@/types/doctor";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const fetchDoctorSuggestions = async (
  query: string
): Promise<DoctorAutocompleteResult[]> => {
  try {
    // Only make request if query has at least 3 characters
    if (query.length < 3) return [];

    const { data } = await axios.get<DoctorAutocompleteResponse>(
      `${API_URL}/api/doctors/autocomplete`,
      {
        params: { query },
        timeout: 5000, // 5 second timeout
      }
    );

    return data.data || [];
  } catch (error) {
    console.error("Autocomplete fetch error:", error);
    return []; // Return empty array on failure
  }
};
