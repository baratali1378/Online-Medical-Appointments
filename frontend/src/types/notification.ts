export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

export interface NotificationFilters {
  filter?: "read" | "unread" | "all";
  search?: string;
  page?: number;
  pageSize?: number;
}
