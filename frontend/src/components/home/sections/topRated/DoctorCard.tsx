// components/doctor/DoctorCard.tsx
import React from "react";
import { DoctorListItem } from "@/types/doctor";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import DoctorRating from "./DoctorRating";
import VerifiedBadge from "./VerifiedBadge";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface DoctorCardProps {
  doctor: DoctorListItem;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const theme = useTheme();

  const renderSpecialties = () => {
    if (!doctor.specialties || doctor.specialties.length === 0) {
      return (
        <Chip
          label="General Practitioner"
          size="small"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            fontWeight: 500,
            px: 1,
            height: 22,
          }}
        />
      );
    }

    const primarySpecialty = doctor.specialties[0].name;

    return (
      <Box sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
        <Chip
          label={primarySpecialty}
          size="small"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            fontWeight: 500,
            height: 22,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        />
        {doctor.specialties.length > 1 && (
          <Chip
            label={`+${doctor.specialties.length - 1}`}
            size="small"
            sx={{
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.secondary,
              fontWeight: 500,
              height: 22,
              ml: 0.5,
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <Link
      href={`/doctors/${doctor.id}`}
      passHref
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.25s ease",
          maxWidth: 280, // smaller width
          mx: "auto",
          borderRadius: 3, // softer corners
          overflow: "hidden",
          border: "1px solid",
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[6],
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <Box position="relative" sx={{ pt: 2, px: 2 }}>
          <Box
            sx={{
              position: "relative",
              width: 100,
              height: 100,
              mx: "auto",
              borderRadius: "50%",
              border: `3px solid ${theme.palette.background.paper}`,
              boxShadow: theme.shadows[2],
            }}
          >
            <Avatar
              src={
                doctor.personal_info.image?.url
                  ? `${API_URL}${doctor.personal_info.image.url}?width=200&quality=90`
                  : "/default-doctor.jpg"
              }
              alt={doctor.personal_info.fullname}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
            {doctor.security.is_verified && (
              <VerifiedBadge
                size="medium"
                position="absolute"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                }}
              />
            )}
          </Box>
        </Box>

        <CardContent sx={{ px: 2, pt: 1.5, pb: 2 }}>
          <Stack spacing={1.2} alignItems="center">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {doctor.personal_info.fullname}
                {doctor.security.is_verified && (
                  <VerifiedBadge
                    size="small"
                    position="relative"
                    withTooltip={false}
                    sx={{ ml: 0.5, verticalAlign: "middle" }}
                  />
                )}
              </Typography>
            </Box>

            {renderSpecialties()}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.secondary,
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ mr: 0.3 }} />
              <Typography variant="body2">
                {doctor.city?.name || "Location not specified"}
              </Typography>
            </Box>

            <DoctorRating
              rating={doctor.rating}
              reviewCount={doctor.reviewCount}
              size="small"
            />
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DoctorCard;
