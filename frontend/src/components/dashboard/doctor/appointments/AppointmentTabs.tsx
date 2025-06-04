"use client";

import {
  Tabs,
  Tab,
  Typography,
  Stack,
  Button,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { useMemo, useState } from "react";
import { ViewMode, AppointmentFilters } from "@/types/appointments";
import { CalendarMonth, ArrowDropDown } from "@mui/icons-material";

interface Props {
  value: ViewMode;
  onViewChange: (view: ViewMode) => void;
  filters: AppointmentFilters;
  onFilterChange: (filters: AppointmentFilters) => void;
}

export const AppointmentTabsWithCalendar = ({
  value,
  onViewChange,
  filters,
  onFilterChange,
}: Props) => {
  const views: ViewMode[] = ["Day View", "List View", "Week View"];
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tempRange, setTempRange] = useState<DateRange<Date>>([null, null]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dateRangeValue: DateRange<Date> = useMemo(() => {
    if (!filters.dateRange) return [null, null];
    return [new Date(filters.dateRange.start), new Date(filters.dateRange.end)];
  }, [filters.dateRange]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTempRange(dateRangeValue);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleApplyDateRange = () => {
    if (tempRange[0] && tempRange[1]) {
      onFilterChange({
        ...filters,
        dateRange: {
          start: format(tempRange[0], "yyyy-MM-dd"),
          end: format(tempRange[1], "yyyy-MM-dd"),
        },
      });
      onViewChange("List View");
    }
    handleClosePopover();
  };

  const handleQuickSelection = (view: ViewMode) => {
    const now = new Date();
    let range;

    if (view === "Day View") {
      range = {
        start: format(startOfDay(now), "yyyy-MM-dd"),
        end: format(endOfDay(now), "yyyy-MM-dd"),
      };
    } else if (view === "Week View") {
      range = {
        start: format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        end: format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      };
    }

    onViewChange(view);
    onFilterChange({
      ...filters,
      dateRange: range,
    });
  };

  const getDisplayText = () => {
    if (!filters.dateRange) return "Select date range";

    const start = new Date(filters.dateRange.start);
    const end = new Date(filters.dateRange.end);

    if (isSameDay(start, end)) {
      return format(start, "MMM d, yyyy");
    }
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        alignItems={isMobile ? "stretch" : "center"}
        sx={{ width: "100%" }}
      >
        <Tabs
          value={value}
          onChange={(_, newValue) => handleQuickSelection(newValue)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ flex: 1 }}
        >
          {views.map((v) => (
            <Tab key={v} label={v} value={v} />
          ))}
        </Tabs>

        <Button
          variant="outlined"
          startIcon={<CalendarMonth />}
          endIcon={<ArrowDropDown />}
          onClick={handleOpenPopover}
          fullWidth={isMobile}
          sx={{
            minWidth: 220,
            justifyContent: "space-between",
            textTransform: "none",
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          {getDisplayText()}
        </Button>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              p: 3,
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Typography variant="subtitle1" mb={2} fontWeight="medium">
            Select Date Range
          </Typography>

          <DateRangePicker
            value={tempRange}
            onChange={(newValue) => setTempRange(newValue as DateRange<Date>)}
            calendars={isMobile ? 1 : 2}
            sx={{
              "& .MuiDateRangePickerDay-root": {
                borderRadius: 1,
              },
              "& .Mui-selected": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlight": {
                backgroundColor: "action.selected",
              },
            }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button
              variant="text"
              onClick={handleClosePopover}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleApplyDateRange}
              disabled={!tempRange[0] || !tempRange[1]}
            >
              Apply
            </Button>
          </Stack>
        </Popover>
      </Stack>
    </LocalizationProvider>
  );
};
