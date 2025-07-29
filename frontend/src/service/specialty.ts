import { fetchData } from "@/lib/strapiClient";
import { Specialty, TopSpecialty } from "@/types/specialty";

export async function getSpecialties(): Promise<Specialty[]> {
  return fetchData<Specialty[]>("/specialties");
}

export async function getTopSpecialties(
  limit: number = 10
): Promise<TopSpecialty[]> {
  return fetchData<TopSpecialty[]>(`/specialties/top?limit=${limit}`);
}
