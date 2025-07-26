import React from "react";
import { List } from "@mui/material";
import { NotificationItem, NotificationItemSkeleton } from "./NotificationItem";
import { Notification } from "@/types/notification";
import { EmptyState } from "./EmptyState";

interface Props {
  notifications: Notification[];
  loading: boolean;
  onMarkRead: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const NotificationList = React.memo(
  ({ notifications, loading, onMarkRead, onDelete }: Props) => {
    if (loading) {
      return (
        <List disablePadding>
          {[...Array(5)].map((_, i) => (
            <NotificationItemSkeleton key={i} />
          ))}
        </List>
      );
    }

    if (notifications.length === 0) {
      return (
        <EmptyState
          title="No notifications"
          description="You're all caught up! No new notifications to display."
          icon="📭"
          sx={{ py: 6 }}
        />
      );
    }

    return (
      <List disablePadding>
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onMarkRead={onMarkRead}
            onDelete={onDelete}
          />
        ))}
      </List>
    );
  }
);
