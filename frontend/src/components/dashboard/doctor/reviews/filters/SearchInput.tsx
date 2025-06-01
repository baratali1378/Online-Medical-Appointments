import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  searchQuery: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ searchQuery, onChange }: Props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search by review or patient name..."
      value={searchQuery}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
}
