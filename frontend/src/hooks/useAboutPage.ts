import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/service/aboutService";
import { AboutData } from "@/types/about";

export const useAbout = () => {
  const { data, isLoading, error } = useQuery<AboutData, Error>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
  });

  if (error) throw error;

  return { about: data, loading: isLoading };
};
