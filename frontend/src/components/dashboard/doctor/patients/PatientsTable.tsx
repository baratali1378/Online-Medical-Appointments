"use client";

import React, { useState, useMemo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  Theme,
  Stack,
  Chip,
} from "@mui/material";
import { ApiPatient } from "@/types/patient";
import { FilterBar } from "./FilterBar";
import { PatientCard } from "./PatientCard";
import { PatientDetailsDialog } from "./PatientDetailsDialog";

interface PatientsTableProps {
  patients: ApiPatient[];
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const PatientsTable: React.FC<PatientsTableProps> = ({ patients }) => {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    city: "",
  });

  const [selectedPatient, setSelectedPatient] = useState<ApiPatient | null>(
    null
  );

  const handleOpenDetails = (patient: ApiPatient) => {
    setSelectedPatient(patient);
  };

  const handleCloseDetails = () => {
    setSelectedPatient(null);
  };

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter(({ personal_info }) => {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = personal_info.fullname
        .toLowerCase()
        .includes(searchLower);
      const emailMatch = personal_info.email
        .toLowerCase()
        .includes(searchLower);

      const genderVal = (personal_info as any).gender || "";

      const genderMatch = filters.gender === "" || filters.gender === genderVal;

      return (nameMatch || emailMatch) && genderMatch;
    });
  }, [patients, filters]);

  if (patients.length === 0) {
    return (
      <Box textAlign="center" mt={5} color="text.secondary">
        <Typography variant="h6">No patients found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters({ search: "", gender: "", city: "" })}
      />

      {isMobile ? (
        filteredPatients.length === 0 ? (
          <Typography textAlign="center" mt={3}>
            No patients match your filters.
          </Typography>
        ) : (
          filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} apiUrl={""} />
          ))
        )
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          <Table
            stickyHeader
            aria-label="patients table"
            sx={{
              minWidth: 700,
              "& .MuiTableCell-root": {
                padding: "14px 20px",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {["Patient", "Email", "Phone", "Gender", "Birth"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        bgcolor: "#A6E3E9",
                        borderBottom: "2px solidrgb(160, 240, 244)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No patients match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map(
                  ({ id, personal_info, contact_details }, index) => {
                    const avatarSrc = personal_info.image?.url
                      ? `${API_URL}${personal_info.image.url}`
                      : undefined;

                    return (
                      <TableRow
                        key={id}
                        hover
                        sx={{
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 0 ? "#F9F9F9" : "white",
                          "&:hover": {
                            backgroundColor: "#E0F7FA",
                          },
                          transition: "background-color 0.2s ease-in-out",
                        }}
                        onClick={() =>
                          handleOpenDetails({
                            id,
                            personal_info,
                            contact_details,
                          })
                        }
                      >
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Avatar
                              src={avatarSrc}
                              sx={{
                                bgcolor: "#71C9CE",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {personal_info.fullname.charAt(0)}
                            </Avatar>
                            <Typography fontWeight="500">
                              {personal_info.fullname}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{personal_info.email}</TableCell>
                        <TableCell>
                          {contact_details.phone_number || "—"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={(personal_info as any).gender || "—"}
                            sx={{
                              bgcolor: "#71C9CE20",
                              color: "#71C9CE",
                              fontWeight: "bold",
                              height: 24,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {(personal_info as any).birth || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <PatientDetailsDialog
        open={!!selectedPatient}
        patient={selectedPatient}
        apiUrl={API_URL}
        onClose={handleCloseDetails}
      />
    </Box>
  );
};
