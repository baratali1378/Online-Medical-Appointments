import React from "react";
import {
  Box,
  Typography,
  Stack,
  Alert,
  Paper,
  useTheme,
  Pagination,
  TextField,
  InputAdornment,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicalRecordCard from "./MedicalRecordCard";
import MedicalRecordsSkeleton from "./MedicalRecordsSkeleton";
import { PatientMedicalRecordListResponse } from "@/types/medical-record";
import EmptyState from "./EmptyState";

interface MedicalRecordsViewProps {
  records: PatientMedicalRecordListResponse["data"];
  meta?: PatientMedicalRecordListResponse["meta"];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({
  records,
  meta,
  isLoading,
  isError,
  error,
  searchTerm,
  onSearchChange,
  page,
  onPageChange,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        background: `linear-gradient(180deg, #E0F7FA, #FFFFFF)`,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #00ACC1, #00838F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Medical History
          </Typography>
          <Typography color="text.secondary" fontSize="1rem">
            Track your diagnoses, treatments, and follow-ups all in one place.
          </Typography>
        </Box>

        {/* Search */}
        <Box>
          <TextField
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search by doctor, diagnosis, or date..."
            fullWidth
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
              },
            }}
          />
        </Box>

        {/* Content */}
        {isLoading ? (
          <MedicalRecordsSkeleton />
        ) : isError ? (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error?.message || "Failed to load records. Please try again."}
          </Alert>
        ) : records.length === 0 ? (
          <EmptyState
            icon="🩺"
            title="No Medical Records Yet"
            description={
              searchTerm
                ? "No records match your search. Try different keywords."
                : "Your medical records will appear here after your doctor adds them following your visits."
            }
          />
        ) : (
          <Stack spacing={3}>
            {records.map((record) => (
              <Fade in key={record.id}>
                <Box
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    },
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <MedicalRecordCard record={record} />
                </Box>
              </Fade>
            ))}
          </Stack>
        )}

        {/* Pagination */}
        {meta && meta.pageCount > 1 && (
          <Box display="flex" justifyContent="center">
            <Pagination
              count={meta.pageCount}
              page={page}
              onChange={onPageChange}
              color="primary"
              shape="rounded"
              size="large"
              sx={{
                mt: 4,
                "& .MuiPaginationItem-root": {
                  borderRadius: 2,
                  fontWeight: 500,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default MedicalRecordsView;
