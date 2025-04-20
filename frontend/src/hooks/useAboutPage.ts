import { useEffect, useState } from "react";
import { fetchAboutData } from "@/service/aboutService";
import { AboutData } from "@/types/strapi";

export const useAbout = () => {
  const [about, setAbout] = useState<AboutData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAboutData();
        setAbout(data);
      } catch (error: any) {
        // Let the layout ErrorBoundary handle this
        throw new Error(error?.message || "Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { about, loading };
};
