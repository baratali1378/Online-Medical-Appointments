import {
  Card,
  Typography,
  Grid,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import type { ClinicInfo } from "@/types/doctor";

interface Props {
  biography?: string;
  clinicInfo?: ClinicInfo;
}

export default function DoctorBiography({ biography, clinicInfo }: Props) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
        p: { xs: 2, md: 4 },
      }}
      elevation={6}
    >
      <Grid container spacing={isMdUp ? 4 : 3}>
        {/* About the Doctor Section */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            color="#71C9CE"
            textAlign={{ xs: "center", md: "left" }}
          >
            About the Doctor
          </Typography>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{ lineHeight: 1.7, whiteSpace: "pre-line" }}
            textAlign={{ xs: "justify", md: "left" }}
          >
            {biography || "No biography available at the moment."}
          </Typography>
        </Grid>

        {/* Vertical Divider for larger screens */}
        {isMdUp && (
          <Grid item md={1}>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          </Grid>
        )}

        {/* Clinic Information Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            color="#71C9CE"
            textAlign={{ xs: "center", md: "left" }}
          >
            Clinic Information
          </Typography>

          {clinicInfo ? (
            <Box
              sx={{
                bgcolor: "grey.50",
                borderRadius: 3,
                p: 3,
                boxShadow: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                textAlign={{ xs: "center", md: "left" }}
              >
                {clinicInfo.clinic_name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1,
                }}
              >
                <LocationOnIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
                <Typography variant="body2">{clinicInfo.address}</Typography>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1,
                }}
              >
                <PhoneIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="body2">{clinicInfo.phone}</Typography>
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={{ xs: "center", md: "left" }}
            >
              Clinic information is not provided.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
