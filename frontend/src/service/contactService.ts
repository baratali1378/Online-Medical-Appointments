import axios from "axios";
import { ContactData } from "@/types/contact";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface ContactMessagePayload {
  fullname: string;
  email: string;
  phone?: string;
  message: string;
}

export const sendContactMessage = async (data: ContactMessagePayload) => {
  const response = await axios.post(`${API_URL}/api/contact-messages`, {
    data,
  });

  return response.data;
};

export default async function fetchAboutData(): Promise<ContactData> {
  try {
    const response = await axios.get(`${API_URL}/api/contact?populate=*`);
    console.log("hello", response.data);
    return response.data.data; // Return the `data` field from the response
  } catch (error: any) {
    // Handle errors appropriately
    throw new Error(
      error.response?.data?.message || "Failed to fetch About data"
    );
  }
}
