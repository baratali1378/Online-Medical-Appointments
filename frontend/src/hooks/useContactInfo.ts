import { fetchContactData } from "@/service/contactService";
import { ContactData } from "@/types/contact";
import { useFetch } from "@/hooks/useFetchData";

export const useContactInfo = () => {
  const { data, loading, error } = useFetch<ContactData>(fetchContactData);
  console.log(data);
  if (error) throw new Error(error);

  return { contact: data, loading: loading };
};
