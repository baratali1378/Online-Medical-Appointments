"use client";

import React, { useState, useEffect } from "react";
import { usePatientMedicalRecordsQuery } from "@/hooks/profile/patient/useMedicalRecordQuery";
import MedicalRecordsView from "./MedicalRecordsView";

interface Props {
  token: string;
}

const MedicalRecordsContainer: React.FC<Props> = ({ token }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const { data, isLoading, isError, error, refetch } =
    usePatientMedicalRecordsQuery({
      token,
      page,
      pageSize,
      search: searchTerm,
    });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    console.log("page", value);
    setPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <MedicalRecordsView
      records={data?.data || []}
      meta={data?.meta}
      isLoading={isLoading}
      isError={isError}
      error={error}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

export default MedicalRecordsContainer;
