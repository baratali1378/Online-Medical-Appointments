import { createApiClient } from "@/lib/strapiClient";
import { AvailableSlotResponse, AvailableSlot } from "@/types/slots";

interface SlotCreateInput {
  date: string; // ISO date string
  start_time: string; // HH:mm:ss or similar format
  end_time: string;
  capacity?: number;
  is_active?: boolean;
}

interface SlotUpdateInput {
  date?: string;
  start_time?: string;
  end_time?: string;
  capacity?: number;
  is_active?: boolean;
}

export class DoctorAvailableSlotsService {
  private client;

  constructor(token: string) {
    if (!token) throw new Error("Authorization token is required");
    this.client = createApiClient(token);
  }

  // GET all slots for doctor
  async getSlots(): Promise<AvailableSlotResponse> {
    try {
      const { data } = await this.client.get<AvailableSlotResponse>(
        "api/doctor/available-slots"
      );
      return data;
    } catch (error: any) {
      throw {
        message:
          error.response?.data?.message ||
          "Failed to fetch available slots for doctor",
        status: error.response?.status || 500,
      };
    }
  }

  // CREATE a new slot
  async createSlot(slotData: SlotCreateInput): Promise<AvailableSlot> {
    try {
      console.log("slots", slotData);
      const { data } = await this.client.post<{ data: AvailableSlot }>(
        "api/doctor/available-slots",
        { data: slotData }
      );
      return data.data;
    } catch (error: any) {
      throw {
        message:
          error.response?.data?.error?.message ||
          "Failed to create available slot",
        status: error.response?.status || 500,
      };
    }
  }

  // UPDATE slot by ID
  async updateSlot(
    id: number | string,
    updates: SlotUpdateInput
  ): Promise<AvailableSlot> {
    try {
      const { data } = await this.client.put<{ data: AvailableSlot }>(
        `api/doctor/available-slots/${id}`,
        { data: updates }
      );
      return data.data;
    } catch (error: any) {
      throw {
        message:
          error.response?.data?.error?.message ||
          "Failed to update available slot",
        status: error.response?.status || 500,
      };
    }
  }

  // DELETE slot by ID
  async deleteSlot(id: number | string): Promise<void> {
    try {
      await this.client.delete(`api/doctor/available-slots/${id}`);
    } catch (error: any) {
      throw {
        message:
          error.response?.data?.error?.message ||
          "Failed to delete available slot",
        status: error.response?.status || 500,
      };
    }
  }
}
