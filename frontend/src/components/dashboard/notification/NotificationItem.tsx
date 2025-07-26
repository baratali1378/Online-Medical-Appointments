import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Stack,
  useTheme,
  Badge,
  Tooltip,
  Skeleton,
  Box,
  Divider,
} from "@mui/material";
import {
  CheckCircle as ReadIcon,
  Delete as DeleteIcon,
  Notifications as NotificationIcon,
  Circle as UnreadIcon,
} from "@mui/icons-material";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";

interface Props {
  notification: Notification;
  onMarkRead: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLastItem?: boolean;
}

export const NotificationItem = React.memo(
  ({ notification, onMarkRead, onDelete, isLastItem }: Props) => {
    const theme = useTheme();
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleAction = async (action: () => Promise<void>) => {
      setIsProcessing(true);
      try {
        await action();
      } finally {
        setIsProcessing(false);
      }
    };

    const getTimeAgo = (dateString: string) => {
      try {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
      } catch {
        return dateString;
      }
    };

    return (
      <>
        <ListItem
          sx={{
            borderRadius: 1,
            mb: 0.5,
            boxShadow: notification.read
              ? "none"
              : `0 0 0 1px ${theme.palette.primary.light}`,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateX(4px)",
            },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              backgroundColor: notification.read
                ? "transparent"
                : theme.palette.primary.main,
            },
            pr: 12,
            py: 1.5,
          }}
          secondaryAction={
            <Stack direction="row" spacing={1} sx={{ right: 8 }}>
              {!notification.read && (
                <Tooltip title="Mark as read">
                  <IconButton
                    onClick={() =>
                      handleAction(() => onMarkRead(notification.id))
                    }
                    disabled={isProcessing}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.success.light,
                      "&:hover": {
                        backgroundColor: theme.palette.success.main,
                        color: "white",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ReadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Delete notification">
                <IconButton
                  onClick={() => handleAction(() => onDelete(notification.id))}
                  disabled={isProcessing}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.error.light,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                      color: "white",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                !notification.read ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.success.main,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: `2px solid ${theme.palette.background.paper}`,
                    }}
                  />
                ) : null
              }
            >
              <Avatar
                sx={{
                  bgcolor: notification.read
                    ? theme.palette.grey[400]
                    : "#71C9CE",
                  color: "white",
                  transition: "all 0.3s ease",
                }}
              >
                <NotificationIcon fontSize="small" />
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!notification.read && (
                  <UnreadIcon
                    color="primary"
                    sx={{
                      fontSize: "0.75rem",
                      mr: 1,
                      flexShrink: 0,
                    }}
                  />
                )}
                <Typography
                  fontWeight={notification.read ? "normal" : "bold"}
                  color={notification.read ? "text.secondary" : "text.primary"}
                  sx={{ pr: 2 }}
                >
                  {notification.message}
                </Typography>
              </Box>
            }
            secondary={
              <Typography
                variant="caption"
                color={notification.read ? "text.disabled" : "text.secondary"}
                sx={{
                  fontSize: "0.75rem",
                  display: "block",
                  mt: 0.5,
                }}
              >
                {getTimeAgo(notification.createdAt)}
              </Typography>
            }
          />
        </ListItem>
        {!isLastItem && (
          <Divider
            variant="inset"
            sx={{
              ml: 6,
              borderColor: theme.palette.divider,
              opacity: notification.read ? 0.5 : 1,
            }}
          />
        )}
      </>
    );
  }
);

export const NotificationItemSkeleton = ({
  isLastItem,
}: {
  isLastItem?: boolean;
}) => (
  <>
    <ListItem sx={{ mb: 0.5, py: 1.5 }}>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" width="80%" />}
        secondary={<Skeleton variant="text" width="60%" />}
      />
    </ListItem>
    {!isLastItem && <Divider variant="inset" sx={{ ml: 6 }} />}
  </>
);
