// hooks/useContactInfo.ts

import { useEffect, useState } from "react";
import { ContactData } from "@/types/contact";
import getContact from "@/service/contactService";

export const useContactInfo = () => {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContact();
        setContact(data);
      } catch (err) {
        setError("Failed to fetch contact info");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contact, loading, error };
};
