import React from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerificationBadge from "./VerificationBadge";
import DoctorRating from "./DoctorRating";
import type { DoctorDetails } from "@/types/doctor";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface Props {
  doctor: DoctorDetails;
  rating?: number;
  reviewCount?: number;
}

export default function DoctorHeader({
  doctor,
  rating = 0,
  reviewCount = 0,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 3, md: 5 },
        boxShadow: 6,
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Avatar
        src={
          API_URL + "" + doctor.personal_info.image?.url ||
          "/default-doctor.jpg"
        }
        alt={doctor.personal_info.fullname}
        sx={{
          width: 140,
          height: 140,
          border: "5px solid",
          borderColor: "#71C9CE",
          boxShadow: 5,
          mb: { xs: 2, md: 0 },
        }}
      />

      <Box flex={1} minWidth={0}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          flexWrap="wrap"
          justifyContent={{ xs: "center", md: "flex-start" }}
          mb={1.5}
        >
          <Tooltip title={doctor.personal_info.fullname}>
            <Typography
              variant="h4"
              fontWeight={900}
              noWrap
              sx={{ maxWidth: { xs: 220, md: "100%" } }}
              color="#71C9CE"
            >
              {doctor.personal_info.fullname}
            </Typography>
          </Tooltip>

          {doctor.security?.is_verified && <VerificationBadge />}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
          spacing={0.5}
          sx={{ color: "text.secondary", fontWeight: 600, mb: 1.5 }}
          title={`${doctor.city?.name || "Location not specified"} • ${
            doctor.experience
          } years experience`}
        >
          <LocationOnIcon sx={{ fontSize: 18, color: "#71C9CE" }} />
          <Typography
            component="span"
            sx={{ fontSize: 16, whiteSpace: "nowrap" }}
          >
            {doctor.city?.name || "Location not specified"}
          </Typography>
          <Box component="span" sx={{ mx: 1 }}>
            &bull;
          </Box>
          <Typography
            component="span"
            sx={{ fontSize: 16, fontWeight: "bold" }}
          >
            {doctor.experience} experience
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          justifyContent={{ xs: "center", md: "flex-start" }}
          mt={1}
        >
          {doctor.specialties?.slice(0, 5).map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              size="medium"
              color="secondary"
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                textTransform: "capitalize",
                boxShadow: 1,
              }}
            />
          ))}
        </Stack>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" }, mx: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-end" },
          minWidth: 150,
        }}
      >
        <DoctorRating rating={rating} reviewCount={reviewCount} size="medium" />
      </Box>
    </Box>
  );
}
