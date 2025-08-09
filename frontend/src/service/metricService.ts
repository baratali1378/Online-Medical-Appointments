import { fetchData } from "@/lib/strapiClient";
import { Metric } from "@/types/metric";

export async function getMetric(): Promise<Metric> {
  return await fetchData<Metric>("/metrics/totals");
}
