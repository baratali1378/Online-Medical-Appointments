import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Shared styles
export const sharedInputStyle = {
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  fontFamily: inter.style.fontFamily,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(178, 227, 242, 0.5)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1A374D",
  },
};

export const StyledSelect = ({
  value,
  onChange,
  placeholder,
  icon,
  options,
}: {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  placeholder: string;
  icon: React.ReactNode;
  options: string[];
}) => (
  <Select
    fullWidth
    displayEmpty
    value={value}
    onChange={onChange}
    renderValue={(selected) => (
      <Box display="flex" alignItems="center">
        {icon}
        {selected || placeholder}
      </Box>
    )}
    sx={sharedInputStyle}
  >
    {options.map((option) => (
      <MenuItem
        key={option}
        value={option}
        sx={{ fontFamily: inter.style.fontFamily }}
      >
        {option}
      </MenuItem>
    ))}
  </Select>
);
