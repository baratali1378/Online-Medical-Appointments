import { fetchData } from "@/lib/strapiClient";
import { Specialty } from "@/types/specialty";

export async function getSpecialties(): Promise<Specialty[]> {
  return fetchData<Specialty[]>("/specialties");
}
