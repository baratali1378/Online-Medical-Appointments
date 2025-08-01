import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface MedicalRecordsFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicalRecordsFilter: React.FC<MedicalRecordsFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by complaint, diagnosis or doctor..."
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 3,
            backgroundColor: "background.paper",
          },
        }}
        sx={{
          maxWidth: 600,
          "& .MuiOutlinedInput-root": {
            boxShadow: "none",
          },
        }}
      />
    </Box>
  );
};

export default MedicalRecordsFilter;
