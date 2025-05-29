"use client";

import {
  Card,
  CardContent,
  Grid2,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Phone } from "@/types/doctor";

interface PhoneNumberItemProps {
  index: number;
  number: Phone;
  handleChange: any;
  errors: any;
  touched: any;
  loading: boolean;
  isMobile: boolean;
  onRemove: () => void;
  canRemove: boolean;
}

export const PhoneNumberItem = ({
  index,
  number,
  handleChange,
  errors,
  touched,
  loading,
  isMobile,
  onRemove,
  canRemove,
}: PhoneNumberItemProps) => {
  const hasError =
    touched.phone_numbers &&
    touched.phone_numbers[index] &&
    errors.phone_numbers &&
    (errors.phone_numbers[index] as any)?.text;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: "0px 1px 4px rgba(0,0,0,0.05)" }}>
      <CardContent>
        <Grid2 container spacing={1} alignItems="center">
          <Grid2 size={{ xs: 10, sm: 11 }}>
            <TextField
              fullWidth
              size="small"
              label={`Phone Number ${index + 1}`}
              name={`phone_numbers[${index}].text`}
              value={number.text}
              onChange={handleChange}
              error={!!hasError}
              helperText={hasError}
              disabled={loading}
              placeholder="+93 772228192"
              sx={{
                maxWidth: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#71C9CE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#71C9CE",
                    boxShadow: "0 0 0 2px rgba(113, 201, 206, 0.2)",
                  },
                },
              }}
            />
          </Grid2>
          <Grid2
            size={{ xs: 2, sm: 1 }}
            display="flex"
            justifyContent="flex-end"
          >
            <Tooltip title="Remove">
              <span>
                <IconButton
                  onClick={onRemove}
                  color="error"
                  disabled={!canRemove}
                  size="small"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 86, 48, 0.08)",
                    },
                  }}
                >
                  <Delete fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </span>
            </Tooltip>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
