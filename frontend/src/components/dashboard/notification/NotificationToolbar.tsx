import React from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  DoneAll as MarkAllReadIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { NotificationFilters } from "@/types/notification";

interface Props {
  filters: NotificationFilters;
  unreadCount: number;
  onFilterChange: (filters: Partial<NotificationFilters>) => void;
  onMarkAllRead: () => Promise<void>;
}

export const NotificationToolbar = React.memo(
  ({ filters, unreadCount, onFilterChange, onMarkAllRead }: Props) => {
    const theme = useTheme();
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ search: e.target.value, page: 1 });
    };

    const handleTabChange = (
      _: React.SyntheticEvent,
      newValue: "all" | "read" | "unread"
    ) => {
      onFilterChange({ filter: newValue, page: 1 });
    };

    const handleMarkAllRead = async () => {
      setIsProcessing(true);
      try {
        await onMarkAllRead();
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" fontWeight="bold">
            Notifications
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} unread`}
                color="info"
                size="small"
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  transform: "translateY(-2px)",
                }}
              />
            )}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<MarkAllReadIcon />}
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0 || isProcessing}
              variant="contained"
              size="medium"
              sx={{
                textTransform: "none",
                bgcolor: "#71C9CE",
                borderRadius: 2,
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: theme.shadows[2],
                },
              }}
            >
              Mark All Read
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search notifications..."
            value={filters.search || ""}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                backgroundColor: "background.paper",
                boxShadow: theme.shadows[1],
              },
            }}
          />

          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              borderRadius: 3,
              color: "#71C9CE",
              px: 3,
              minWidth: { xs: "100%", md: "auto" },
            }}
          >
            Filters
          </Button>
        </Box>

        <Tabs
          value={filters.filter || "all"}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                All
              </Box>
            }
            value="all"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Unread
              </Box>
            }
            value="unread"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Read
              </Box>
            }
            value="read"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
          />
        </Tabs>
      </Box>
    );
  }
);
