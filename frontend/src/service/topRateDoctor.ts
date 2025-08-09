import { fetchData } from "@/lib/strapiClient";
import { DoctorListItem } from "@/types/doctor";

export async function getDoctorList(): Promise<DoctorListItem[]> {
  return fetchData<DoctorListItem[]>("/doctors/top-rated");
}
