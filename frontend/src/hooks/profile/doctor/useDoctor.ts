import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DoctorService } from "@/service/profile/doctor/profileService";
import { Doctor } from "@/types/doctor";

interface Prop {
  token?: string;
}

export const useDoctor = ({ token }: Prop) => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<Doctor>({
    queryKey: ["doctorProfile", token],
    queryFn: () => {
      if (!token) return Promise.reject("No token provided");
      return DoctorService.getDoctorProfile(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateMutation = useMutation<
    Doctor,
    Error,
    Partial<Pick<Doctor, "personal_info" | "city" | "biography" | "experience">>
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
    Error,
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

  const uploadVerificationMutation = useMutation<
    void, // Success return type
    Error, // Error type (optional)
    { file: File; type: string } // Input variables to `mutationFn`
  >({
    mutationFn: ({ file, type }) =>
      DoctorService.uploadVerification(token || "", file, type),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
    },
    onError: (error) => {
      console.error("Verification upload failed:", error.message);
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

    uploadVerification: uploadVerificationMutation.mutateAsync,
    isUploadingVerification: uploadVerificationMutation.isPending,
    uploadVerificationError: uploadVerificationMutation.error,

    refetch: profileQuery.refetch,
  };
};
