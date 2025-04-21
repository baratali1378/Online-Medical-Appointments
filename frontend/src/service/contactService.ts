import axios from "axios";
import { ContactData } from "@/types/contact";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getContactInfo = async (): Promise<ContactData> => {
  const res = await axios.get<{ data: ContactData }>(
    API_URL + "api/contact?populate=*"
  );
  return res.data.data;
};
