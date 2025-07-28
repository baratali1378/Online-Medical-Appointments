import { fetchData } from "@/lib/strapiClient";
import { Metric } from "@/types/metric";

export async function getMetric(): Promise<Metric> {
  return fetchData<Metric>("/metric");
}
