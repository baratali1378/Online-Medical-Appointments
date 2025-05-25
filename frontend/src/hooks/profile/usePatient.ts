import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PatientService,
  PatientServiceError,
} from "@/service/profile/patient/profileService";
import {
  PatientProfile,
  PatientImage,
  PatientProfileFormValues,
} from "@/types/patient";

interface Prop {
  token?: string;
}

export const usePatient = ({ token }: Prop) => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<PatientProfile, PatientServiceError>({
    queryKey: ["patientProfile", token], // ✅ Include token in queryKey
    queryFn: () => {
      if (!token) return Promise.reject("No token provided");
      return PatientService.getPatientProfile(token);
    },
    enabled: !!token, // Only enable if token exists
    retry: (failureCount, error) => {
      if (error.status === 404 || error.status === 401) return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5,
  });
  // Always call updateMutation hook
  const updateMutation = useMutation<
    PatientProfile,
    PatientServiceError,
    Partial<PatientProfileFormValues>
  >({
    mutationFn: (data) =>
      PatientService.updatePatientProfile(token || "", data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["patientProfile"], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
    onError: (error) => {
      console.error("Profile update failed:", error.message);
    },
  });

  // Always call uploadImageMutation hook
  const uploadImageMutation = useMutation<
    PatientImage,
    PatientServiceError,
    File
  >({
    mutationFn: (file) => PatientService.uploadPatientImage(token || "", file),
    onSuccess: (imageData) => {
      queryClient.setQueryData<PatientProfile>(["patientProfile"], (old) => {
        if (!old) return undefined;
        return {
          ...old,
          personal_info: {
            ...old.personal_info,
            image: imageData,
          },
        };
      });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isFetching: profileQuery.isFetching,
    error: profileQuery.error,

    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    uploadImage: uploadImageMutation.mutateAsync,
    isUploading: uploadImageMutation.isPending,
    uploadError: uploadImageMutation.error,

    refetch: profileQuery.refetch,
  };
};
