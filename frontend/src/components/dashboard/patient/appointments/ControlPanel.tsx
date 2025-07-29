import { Box, TextField, MenuItem, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AppointmentFilters } from "@/types/appointments";

interface Props {
  filters: AppointmentFilters;
  onFilterChange: (filters: AppointmentFilters) => void;
  onRefresh: () => void;
}

export function ControlPanel({ filters, onFilterChange, onRefresh }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
      <TextField
        select
        label="Status"
        value={filters.status || "All"}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            status: e.target.value as AppointmentFilters["status"],
          })
        }
        size="small"
        sx={{ minWidth: 150 }}
      >
        {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search by Doctor"
        value={filters.search || ""}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        size="small"
      />

      <Tooltip title="Refresh">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
