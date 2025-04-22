import { AboutData } from "@/types/strapi";
import { fetchData } from "@/lib/strapiClient";

export async function fetchAboutData(): Promise<AboutData> {
  return fetchData<AboutData>("/about?populate=*");
}
