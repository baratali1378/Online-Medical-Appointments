import { fetchData } from "@/lib/strapiClient";
import { City } from "@/types/city";

export async function getCities(): Promise<City[]> {
  return fetchData<City[]>("/cities");
}
