import { createApiClient } from "@/lib/strapiClient";
import {
  AvailableSlotResponse,
  AvailableSlot,
  SlotCreateInput,
  SlotUpdateInput,
} from "@/types/slots";

export class DoctorAvailableSlotsService {
  private client;

  constructor(token: string) {
    if (!token) throw new Error("Authorization token is required");
    this.client = createApiClient(token);
  }

  // 🔍 Fetch slots for logged-in doctor
  async getSlots(): Promise<AvailableSlotResponse> {
    return this.fetchSlots("api/doctor/available-slots");
  }

  // 🔍 Fetch slots for a specific doctor by ID (patient use case)
  async getSlotsByDoctorId(
    doctorId: number | string
  ): Promise<AvailableSlotResponse> {
    try {
      const { data } = await this.client.get<AvailableSlotResponse>(
        `api/doctor/available-slots/${doctorId}`
      );
      console.log("Fetched slots for doctor", doctorId, ":", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching slots for doctor", doctorId, ":", error);
      throw {
        message:
          error.response?.data?.message || "Failed to fetch available slots",
        status: error.response?.status || 500,
      };
    }
  }

  // 📌 Create a new slot
  async createSlot(slotData: SlotCreateInput): Promise<AvailableSlot> {
    const { data } = await this.client.post<{ data: AvailableSlot }>(
      "api/doctor/available-slots",
      { data: slotData }
    );
    return data.data;
  }

  // 📌 Update a slot
  async updateSlot(
    id: number | string,
    updates: SlotUpdateInput
  ): Promise<AvailableSlot> {
    const { data } = await this.client.put<{ data: AvailableSlot }>(
      `api/doctor/available-slots/${id}`,
      { data: updates }
    );
    return data.data;
  }

  // 📌 Delete a slot
  async deleteSlot(id: number | string): Promise<void> {
    await this.client.delete(`api/doctor/available-slots/${id}`);
  }

  // 🔁 Internal helper to fetch slots (DRY)
  private async fetchSlots(endpoint: string): Promise<AvailableSlotResponse> {
    try {
      const { data } = await this.client.get<AvailableSlotResponse>(endpoint);
      return data;
    } catch (error: any) {
      throw {
        message:
          error.response?.data?.message || "Failed to fetch available slots",
        status: error.response?.status || 500,
      };
    }
  }
}
