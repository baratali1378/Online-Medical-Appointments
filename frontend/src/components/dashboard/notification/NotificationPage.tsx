// NotificationPage.tsx
import React from "react";
import { NotificationView } from "./NotificationView";
import { useNotifications } from "@/hooks/profile/dashboard/useNotification";
import { NotificationFilters } from "@/types/notification";

interface Props {
  token: string;
  userType: "doctor" | "patient";
}

export const NotificationPage = ({ token, userType }: Props) => {
  const [filters, setFilters] = React.useState<NotificationFilters>({
    filter: "all",
    page: 1,
    pageSize: 10,
    search: "",
  });

  const {
    useGetNotifications,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
  } = useNotifications(token, userType);

  const { data, isLoading } = useGetNotifications(filters);
  const markAsReadMutation = useMarkAsRead();
  const markAllReadMutation = useMarkAllAsRead();
  const deleteMutation = useDeleteNotification();

  const unreadCount = data?.notifications?.filter((n) => !n.read).length || 0;

  return (
    <NotificationView
      notifications={data?.notifications || []}
      total={data?.total || 0}
      loading={isLoading}
      filters={filters}
      unreadCount={unreadCount}
      onFilterChange={(newFilters) =>
        setFilters((prev) => ({ ...prev, ...newFilters }))
      }
      onMarkRead={markAsReadMutation.mutateAsync}
      onMarkAllRead={markAllReadMutation.mutateAsync}
      onDelete={deleteMutation.mutateAsync}
    />
  );
};
