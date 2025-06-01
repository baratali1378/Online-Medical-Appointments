import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const strapi = axios.create({
  baseURL: `${API_URL}/api`,
});

export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await strapi.get(endpoint);
    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch ${endpoint}`
    );
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await strapi.post(endpoint, { data });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message || `Failed to post to ${endpoint}`
    );
  }
}

export const createApiClient = (token: string) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 15000, // Default timeout
  });
};
