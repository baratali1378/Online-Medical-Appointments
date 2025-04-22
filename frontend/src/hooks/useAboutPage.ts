import { fetchAboutData } from "@/service/aboutService";
import { AboutData } from "@/types/strapi";
import { useFetch } from "@/hooks/useFetchData";

export const useAbout = () => {
  const { data, loading, error } = useFetch<AboutData>(fetchAboutData);
  if (error) throw new Error(error); // Let ErrorBoundary handle
  return { about: data, loading };
};
