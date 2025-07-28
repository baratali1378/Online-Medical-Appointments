import { useQuery } from "@tanstack/react-query";
import { getMetric } from "@/service/metricService";
import { Metric } from "@/types/metric";

export function useMetric() {
  return useQuery<Metric, Error>({
    queryKey: ["metric"],
    queryFn: getMetric,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });
}
