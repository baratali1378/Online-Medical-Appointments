import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DoctorService,
  DoctorServiceError,
} from "@/service/profile/doctor/profileService";
import { Doctor } from "@/types/doctor";

interface Prop {
  token?: string;
}

export const useDoctor = ({ token }: Prop) => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<Doctor, DoctorServiceError>({
    queryKey: ["doctorProfile", token],
    queryFn: () => {
      if (!token) return Promise.reject("No token provided");
      return DoctorService.getDoctorProfile(token);
    },
    enabled: !!token,
    retry: (failureCount, error) => {
      if (error.status === 404 || error.status === 401) return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateMutation = useMutation<
    Doctor,
    DoctorServiceError,
    Partial<
      Pick<
        Doctor,
        "personal_info" | "phone_number" | "city" | "biography" | "experience"
      >
    >
  >({
    mutationFn: (data) => DoctorService.updateDoctorProfile(token || "", data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["doctorProfile"], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
    onError: (error) => {
      console.error("Doctor profile update failed:", error.message);
    },
  });

  const uploadImageMutation = useMutation<
    Doctor["personal_info"]["image"],
    DoctorServiceError,
    File
  >({
    mutationFn: (file) => DoctorService.uploadDoctorImage(token || "", file),
    onSuccess: (imageData) => {
      queryClient.setQueryData<Doctor>(["doctorProfile"], (old) => {
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
