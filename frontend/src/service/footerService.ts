import axios from "axios";
import { FooterData } from "@/types/footer";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const fetchFooterData = async (): Promise<FooterData> => {
  const res = await axios.get(`${API_URL}/api/footer?populate=*`);
  const { data } = res.data;

  return {
    company_name: data.company_name,
    description: data.description,
    address: data.address,
    email: data.email,
    logo: {
      url:
        API_URL + data.logo?.formats?.small?.url ||
        API_URL + data.logo?.url ||
        "",
    },
    social_links: data.social_links || [],
    useful_links: data.useful_links || [],
    phone_number: data.phone_number || [],
  };
};
