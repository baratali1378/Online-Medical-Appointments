import { useState, useEffect } from "react";
import { PatientProfile, SignupFormValues } from "@/types/patient";
import { PatientService } from "@/service/profile/patient/profileService";

type UsePatientProfileReturn = {
  patient: PatientProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<SignupFormValues>) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
  refetch: () => Promise<void>;
};

interface PatientProp {
  token: string | null;
}

export const usePatientProfile = ({
  token,
}: PatientProp): UsePatientProfileReturn => {
  const [state, setState] = useState<{
    patient: PatientProfile | null;
    loading: boolean;
    error: string | null;
  }>({
    patient: null,
    loading: !!token, // Only load if we have a token
    error: null,
  });

  const fetchPatient = async () => {
    if (!token) {
      setState({
        patient: null,
        loading: false,
        error: "No authentication token",
      });
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const patient = await PatientService.getPatientProfile(token);
      setState({ patient, loading: false, error: null });
    } catch (error) {
      setState({
        patient: null,
        loading: false,
        error: getErrorMessage(error),
      });
    }
  };

  const updateProfile = async (data: Partial<SignupFormValues>) => {
    if (!token) throw new Error("No authentication token");

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const updatedPatient = await PatientService.updatePatientProfile(
        token,
        data
      );
      setState((prev) => ({
        ...prev,
        patient: updatedPatient,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(error),
      }));
      throw error;
    }
  };

  const uploadImage = async (file: File) => {
    if (!token) throw new Error("No authentication token");

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const image = await PatientService.uploadPatientImage(token, file);
      setState((prev) => ({
        ...prev,
        patient: prev.patient ? { ...prev.patient, image } : null,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(error),
      }));
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchPatient();
    }
  }, [token]);

  return {
    ...state,
    updateProfile,
    uploadImage,
    refetch: fetchPatient,
  };
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error occurred";
}
