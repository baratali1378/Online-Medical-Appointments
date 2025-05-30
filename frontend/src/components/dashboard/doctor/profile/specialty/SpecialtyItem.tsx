"use client";

import {
  Checkbox,
  FormControlLabel,
  Grid2,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Specialty } from "@/types/doctor"; // adjust the type if different

const BRAND_COLOR = "#A6E3E9";
const BRAND_LIGHT_BG = "#e7f9fa";

interface SpecialtyItemProps {
  spec: Specialty;
  isChecked: boolean;
  onToggle: () => void;
  loading: boolean;
  getGridColumns: () => number;
}

export const SpecialtyItem = ({
  spec,
  isChecked,
  onToggle,

  loading,
  getGridColumns,
}: SpecialtyItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: getGridColumns() }} key={spec.id}>
      <Paper
        elevation={isChecked ? 3 : 1}
        sx={{
          px: isMobile ? 1 : 2,
          py: isMobile ? 1 : 1.5,
          borderRadius: 2,
          backgroundColor: isChecked
            ? BRAND_LIGHT_BG
            : theme.palette.background.paper,
          border: `2px solid ${
            isChecked ? BRAND_COLOR : theme.palette.divider
          }`,
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: `0 0 0 2px ${BRAND_COLOR}`,
            borderColor: BRAND_COLOR,
            cursor: "pointer",
          },
        }}
        onClick={onToggle}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => {}}
              sx={{
                color: BRAND_COLOR,
                "&.Mui-checked": {
                  color: BRAND_COLOR,
                },
              }}
              disabled={loading}
              size={isMobile ? "small" : "medium"}
            />
          }
          label={
            <Typography
              fontWeight={isChecked ? 600 : 400}
              color={isChecked ? "text.primary" : "text.secondary"}
              variant={isMobile ? "body2" : "body1"}
            >
              {spec.name}
            </Typography>
          }
          sx={{
            marginRight: isMobile ? 0.5 : 1,
            marginLeft: isMobile ? -1 : -0.5,
          }}
        />
      </Paper>
    </Grid2>
  );
};
