import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface Props {
  ratingFilter: string;
  sortOption: string;
  dateRange: [Date | null, Date | null];
  onRatingChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onDateChange: (range: [Date | null, Date | null]) => void;
  isMobile: boolean;
}

function toDateSafe(value: Date | Dayjs | null): Date | null {
  if (!value) return null;
  return value instanceof Date ? value : value.toDate();
}

export default function FilterPanel({
  ratingFilter,
  sortOption,
  dateRange,
  onRatingChange,
  onSortChange,
  onDateChange,
  isMobile,
}: Props) {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Rating</InputLabel>
          <Select
            value={ratingFilter}
            onChange={(e) => onRatingChange(e.target.value)}
            label="Rating"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            {[5, 4, 3, 2, 1].map((num) => (
              <MenuItem key={num} value={num}>{`${num} Star${
                num > 1 ? "s" : ""
              }`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sort By"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="highest">Highest Rated</MenuItem>
            <MenuItem value="lowest">Lowest Rated</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DatePicker
          label="From"
          value={dateRange[0]}
          onChange={(newValue) =>
            onDateChange([toDateSafe(newValue), dateRange[1]])
          }
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              },
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DatePicker
          label="To"
          value={dateRange[1]}
          onChange={(newValue) =>
            onDateChange([dateRange[0], toDateSafe(newValue)])
          }
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
