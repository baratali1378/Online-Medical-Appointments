// components/MedicalRecords/EnhancedRecordsTable.tsx
import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { MedicalRecord } from "@/types/medical-record";
import { EnhancedRecordRow } from "./RecordRow";
import { NoData } from "./NoData";

interface EnhancedRecordsTableProps {
  records: MedicalRecord[];
  onDelete?: (id: number) => void;
}

export const EnhancedRecordsTable: React.FC<EnhancedRecordsTableProps> = ({
  records,
  onDelete,
}) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (records.length === 0) {
    return <NoData />;
  }

  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        {records.map((record) => (
          <EnhancedRecordRow key={record.id} record={record} />
        ))}
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        "&::-webkit-scrollbar": {
          height: "6px",
        },
      }}
    >
      <Table
        stickyHeader
        aria-label="patient medical records table"
        sx={{
          minWidth: 800,
          "& th": {
            fontWeight: "bold",
            backgroundColor: "#A6E3E9",
            color: "#ffffF",
            borderBottom: "2px solid",
            borderColor: "divider",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Record Date</TableCell>
            <TableCell>Chief Complaint</TableCell>
            <TableCell>Follow-up</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <EnhancedRecordRow key={record.id} record={record} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
