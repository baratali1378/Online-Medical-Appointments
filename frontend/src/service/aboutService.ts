import axios from "axios";
import { AboutData } from "@/types/strapi";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchAboutData(): Promise<AboutData> {
  try {
    const response = await axios.get(`${API_URL}/api/about?populate=*`);
    return response.data.data; // Return the `data` field from the response
  } catch (error: any) {
    // Handle errors appropriately
    throw new Error(
      error.response?.data?.message || "Failed to fetch About data"
    );
  }
}
