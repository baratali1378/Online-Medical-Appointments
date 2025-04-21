import { useState } from "react";
import { sendContactMessage } from "@/service/contactService";

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitContactForm = async (formData: {
    fullname: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    setLoading(true);
    setSuccess(false);

    try {
      await sendContactMessage(formData);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { submitContactForm, loading, success };
};
