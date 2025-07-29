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

// 🔹 Generic GET with filters
export async function getWithFilters<T>(
  client: ReturnType<typeof createApiClient>,
  endpoint: string,
  filters: Record<string, any> = {}
): Promise<T> {
  try {
    const params: Record<string, any> = {};

    if (filters.status && filters.status !== "All")
      params.status = filters.status;
    if (filters.dateRange) {
      params.startDate = filters.dateRange.start;
      params.endDate = filters.dateRange.end;
    }
    if (filters.search) params.search = filters.search;

    const { data } = await client.get<T>(endpoint, { params });
    return data;
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || `Failed to fetch ${endpoint}`,
      status: error.response?.status || 500,
    };
  }
}

// 🔹 Generic PUT
export async function putData<T>(
  client: ReturnType<typeof createApiClient>,
  endpoint: string,
  payload: Record<string, any>
): Promise<T> {
  try {
    const { data } = await client.put<T>(endpoint, payload);
    return data;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.error?.message || `Failed to update ${endpoint}`,
      status: error.response?.status || 500,
    };
  }
}
