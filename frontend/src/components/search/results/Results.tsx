"use client";

import { useSearchParams } from "next/navigation";
import { useDoctorSearchQuery } from "@/hooks/useSearch";
import { Typography, Pagination, Stack } from "@mui/material";
import DoctorsList from "./DoctorList";
import { useState } from "react";

export default function DoctorsResults() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { data, isLoading, error } = useDoctorSearchQuery({
    city: searchParams.get("city") || "",
    specialty: searchParams.get("specialty") || "",
    searchQuery: searchParams.get("q") || "",
    minRating: searchParams.get("minRating") || "",
    verified: Boolean(searchParams.get("verified")) || false,
    page,
    pageSize,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error.message}
        </Typography>
      )}

      <DoctorsList doctors={data?.data} isLoading={isLoading} />

      {!isLoading && data?.pagination && data.pagination.totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={data.pagination.totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  );
}
