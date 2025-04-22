import { fetchContactData } from "@/service/contactService";
import { ContactData } from "@/types/contact";
import { useFetch } from "@/hooks/useFetchData";

export const useContactInfo = () => {
  return useFetch<ContactData>(fetchContactData);
};
