import axios from "axios";
import { ProfileData } from "@/types/patient";

// Define the interface for the profile data you expect

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getProfile = async (token: string): Promise<ProfileData> => {
  try {
    console.log(token);
    const response = await axios.get(`${API_URL}/api/patient/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

export const updateProfile = async (
  token: string,
  profileData: Partial<ProfileData>
): Promise<ProfileData> => {
  try {
    const response = await axios.put(`${API_URL}/api/patient/me`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};
