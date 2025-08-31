import { handleServiceError } from "@/lib/error";
import { createApiClient } from "@/lib/strapiClient";
import {
  CreateMedicalRecordPayload,
  DoctorMedicalResponse,
  MedicalRecord,
} from "@/types/medical-record";

export const MedicalRecordService = {
  doctor: {
    async create(
      token: string,
      payload: Partial<CreateMedicalRecordPayload> & { files?: File[] },
      patientId: number,
      appointmentId: number
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);

        const formData = new FormData();

        // Append payload fields to FormData
        for (const [key, value] of Object.entries(payload)) {
          if (key === "files") continue;

          if (value !== undefined && value !== null) {
            if (typeof value === "object" && !(value instanceof File)) {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        }

        // Append files if present
        if (payload.files && payload.files.length > 0) {
          payload.files.forEach((file) => {
            formData.append("files", file);
          });
        }

        const response = await api.post<DoctorMedicalResponse>(
          `/api/doctor/medical-records?patientId=${patientId}&appointmentId=${appointmentId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to create medical record");
      }
    },

    async update(
      token: string,
      id: number,
      payload: Partial<CreateMedicalRecordPayload> & { files?: File[] }
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);
        const formData = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          if (key === "files") continue;

          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }

        if (payload.files && payload.files.length > 0) {
          payload.files.forEach((file) => {
            formData.append("files", file);
          });
        }

        const response = await api.put<DoctorMedicalResponse>(
          `/api/doctor/medical-records/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to update medical record");
      }
    },

    async getAll(
      token: string,
      patientId: number
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);
        const response = await api.get<DoctorMedicalResponse>(
          `/api/doctor/medical-records`,
          {
            params: { patientId },
          }
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to fetch medical records");
      }
    },

    async getById(token: string, id: number): Promise<MedicalRecord> {
      try {
        const api = createApiClient(token);
        const response = await api.get<{ data: MedicalRecord }>(
          `/api/doctor/medical-records/${id}`
        );

        // ✅ response.data has a "data" property containing the record
        return response.data.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to fetch medical record");
      }
    },
  },
};
