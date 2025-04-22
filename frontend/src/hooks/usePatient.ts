import { useState } from "react";
import { PatientPayload, signUp } from "@/service/patientService";

export const usePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: PatientPayload) => {
    try {
      setLoading(true);
      setError(null);
      return await signUp(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
