import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import { Doctor } from "@/types/appointments";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const DoctorInfo = ({ doctor }: { doctor: Doctor }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Link href={`/doctor/${doctor?.id}`} passHref>
        <Avatar
          src={API_URL + "" + doctor?.image || ""}
          alt={doctor?.fullname}
          sx={{
            width: 48,
            height: 48,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        />
      </Link>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Dr. {doctor?.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor?.email}
        </Typography>
      </Box>
    </Box>
  );
};
