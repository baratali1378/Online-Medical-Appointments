import { useQuery } from "@tanstack/react-query";
import { fetchFooterData } from "@/service/footerService";

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooterData,
  });
};
