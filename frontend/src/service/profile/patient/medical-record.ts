import { createApiClient, getWithFilters } from "@/lib/strapiClient";
import {
  PatientMedicalRecordListResponse,
  PatientMedicalRecordDetailResponse,
} from "@/types/medical-record";

interface Filters {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const getPatientMedicalRecords = async (
  token: string,
  { page = 1, pageSize = 10, search = "" }: Filters = {}
) => {
  const client = createApiClient(token);

  const params: Record<string, any> = {
    page,
    pageSize,
  };

  if (search) {
    params.search = search;
  }

  // 🔹 Call API directly without getWithFilters
  const { data } = await client.get<PatientMedicalRecordListResponse>(
    `/api/patient/medical-records`,
    { params }
  );

  return data;
};

// 🔹 Get a single medical record (detail view)
export const getPatientMedicalRecordById = async (
  id: number | string,
  token: string
): Promise<PatientMedicalRecordDetailResponse> => {
  const client = createApiClient(token);

  const { data } = await client.get<PatientMedicalRecordDetailResponse>(
    `api/patient/medical-records/${id}`
  );

  return data;
};
