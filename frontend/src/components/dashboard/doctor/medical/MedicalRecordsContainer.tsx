"use client";

import React, { useState, useMemo } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useMedical } from "@/hooks/profile/doctor/useMedical";
import { FilterBar } from "./FilterBar";
import { EnhancedRecordsTable } from "./RecordsTable";

interface Props {
  token: string;
  patientId: number;
}

export const MedicalRecordsContainer: React.FC<Props> = ({
  token,
  patientId,
}) => {
  const { useGetMedicalRecords } = useMedical(token);
  const { data, isLoading, isError } = useGetMedicalRecords(patientId);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [followUpsOnly, setFollowUpsOnly] = useState(false);

  const filteredRecords = useMemo(() => {
    if (!data) return [];

    return data.data.filter(
      ({ patient, diagnoses, follow_up_required, createdAt }) => {
        const name = patient.personal_info.fullname.toLowerCase();
        const diagnosis = diagnoses?.toLowerCase() || "";
        const searchLower = search.toLowerCase();

        if (followUpsOnly && !follow_up_required) return false;

        if (filterDate === "thisWeek") {
          const now = new Date();
          const recordDate = new Date(createdAt);
          const daysAgo =
            (now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24);
          if (daysAgo > 7) return false;
        }

        return name.includes(searchLower) || diagnosis.includes(searchLower);
      }
    );
  }, [data, search, filterDate, followUpsOnly]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">An error occurred while loading records.</Alert>
    );
  }

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filterDate={filterDate}
        onFilterDateChange={setFilterDate}
        followUpsOnly={followUpsOnly}
        onFollowUpsOnlyChange={setFollowUpsOnly}
      />

      <Box mt={3}>
        <EnhancedRecordsTable records={filteredRecords} />
      </Box>
    </>
  );
};
