import { handleServiceError } from "@/lib/error";
import { createApiClient } from "@/lib/strapiClient";
import { MedicalRecord, DoctorMedicalResponse } from "@/types/medical-record";

export const MedicalRecordService = {
  doctor: {
    async getAll(token: string): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);
        const response = await api.get<DoctorMedicalResponse>(
          "/api/doctor/medical-records"
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(
          error,
          "Failed to fetch doctor medical records"
        );
      }
    },

    async getByPatient(
      token: string,
      patientId: number
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);
        const response = await api.get<DoctorMedicalResponse>(
          `/api/doctor/medical-records/${patientId}`
        );
        return response.data;
      } catch (error) {
        throw handleServiceError(
          error,
          "Failed to fetch patient medical records"
        );
      }
    },

    async create(
      token: string,
      payload: Partial<MedicalRecord>
    ): Promise<MedicalRecord> {
      try {
        const api = createApiClient(token);
        const response = await api.post<{ data: MedicalRecord }>(
          "/api/doctor/medical-records",
          payload
        );
        return response.data.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to create medical record");
      }
    },

    async update(
      token: string,
      id: number,
      payload: Partial<MedicalRecord>
    ): Promise<MedicalRecord> {
      try {
        const api = createApiClient(token);
        const response = await api.put<{ data: MedicalRecord }>(
          `/api/doctor/medical-records/${id}`,
          payload
        );
        return response.data.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to update medical record");
      }
    },
  },
};
