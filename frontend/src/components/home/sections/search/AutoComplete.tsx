import React from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import { DoctorAutocompleteResult } from "@/types/doctor";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: DoctorAutocompleteResult[];
  loading?: boolean;
  placeholder?: string;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  options,
  loading = false,
  placeholder = "Search...",
}) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      loading={loading}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 1.5,
            py: 1,
            borderRadius: 1,
            transition: "background 0.2s",
            "&:hover": {
              backgroundColor: "rgba(178, 227, 242, 0.2)",
            },
          }}
        >
          <Avatar
            alt={option.name}
            src={`${API_URL}${option.image}`}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, lineHeight: 1.2 }}
            >
              {option.name}
            </Typography>
            <Stack direction="row" spacing={0.5} mt={0.5} flexWrap="wrap">
              {option.specialties.map((spec: string) => (
                <Chip
                  key={spec}
                  label={spec}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    backgroundColor: "#B2E3F2",
                    color: "#1A374D",
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      value={{ name: value } as any}
      isOptionEqualToValue={(option, val) => option.name === val.name}
    />
  );
};
