import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  deleteNotification,
} from "@/service/notification";
import { NotificationsResponse } from "@/types/notification";

type UserType = "doctor" | "patient";

export const useNotifications = (token: string, userType: UserType) => {
  const queryClient = useQueryClient();

  const useGetNotifications = (filters: Record<string, any> = {}) => {
    const queryKey = ["notifications", userType, filters] as const;

    const queryOptions: UseQueryOptions<
      NotificationsResponse,
      Error,
      NotificationsResponse,
      typeof queryKey
    > = {
      queryKey,
      queryFn: () => getNotifications(userType, token, filters),
      retry: false,
    };

    return useQuery(queryOptions);
  };

  const useMarkAsRead = () => {
    return useMutation<void, Error, number>({
      mutationFn: (id) => markNotificationRead(userType, id, token),
      onSuccess: () => {
        toast.success("Marked as read");
        queryClient.invalidateQueries({
          queryKey: ["notifications", userType],
        });
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to mark as read");
      },
    });
  };

  const useMarkAllAsRead = () => {
    return useMutation<void, Error>({
      mutationFn: () => markAllNotificationsRead(userType, token),
      onSuccess: () => {
        toast.success("All notifications marked as read");
        queryClient.invalidateQueries({
          queryKey: ["notifications", userType],
        });
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to mark all as read");
      },
    });
  };

  const useDeleteNotification = () => {
    return useMutation<void, Error, number>({
      mutationFn: (id) => deleteNotification(userType, id, token),
      onSuccess: () => {
        toast.success("Notification deleted");
        queryClient.invalidateQueries({
          queryKey: ["notifications", userType],
        });
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to delete notification");
      },
    });
  };

  return {
    useGetNotifications,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
  };
};
