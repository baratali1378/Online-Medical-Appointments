import React from "react";
import {
  Paper,
  Box,
  Pagination,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { NotificationList } from "./NotificationList";
import { NotificationToolbar } from "./NotificationToolbar";
import { Notification, NotificationFilters } from "@/types/notification";

interface Props {
  notifications: Notification[];
  total: number;
  loading: boolean;
  filters: NotificationFilters;
  unreadCount: number;
  onFilterChange: (filters: Partial<NotificationFilters>) => void;
  onMarkRead: (id: number) => Promise<void>;
  onMarkAllRead: () => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const NotificationView = ({
  notifications,
  total,
  loading,
  filters,
  unreadCount,
  onFilterChange,
  onMarkRead,
  onMarkAllRead,
  onDelete,
}: Props) => {
  const theme = useTheme();
  const totalPages = Math.ceil(total / (filters.pageSize || 10));

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <NotificationToolbar
        filters={filters}
        unreadCount={unreadCount}
        onFilterChange={onFilterChange}
        onMarkAllRead={onMarkAllRead}
      />

      <Divider sx={{ my: 3 }} />

      <NotificationList
        notifications={notifications}
        loading={loading}
        onMarkRead={onMarkRead}
        onDelete={onDelete}
      />

      {totalPages > 1 && (
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {(filters.page! - 1) * (filters.pageSize || 10) + 1}–
            {Math.min(filters.page! * (filters.pageSize || 10), total)} of{" "}
            {total} notifications
          </Typography>
          <Pagination
            count={totalPages}
            page={filters.page || 1}
            onChange={(_, page) => onFilterChange({ page })}
            shape="rounded"
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 1,
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};
