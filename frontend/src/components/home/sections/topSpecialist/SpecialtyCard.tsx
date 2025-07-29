import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import { TopSpecialty } from "@/types/specialty";

interface SpecialtyCardProps {
  specialty: TopSpecialty;
  API_URL?: string;
}

export const SpecialtyCard = ({ specialty, API_URL }: SpecialtyCardProps) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "none",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        borderColor: "primary.main",
      },
    }}
  >
    <CardContent
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <Avatar
          src={API_URL + specialty.icon}
          alt={specialty.name}
          sx={{
            width: 90,
            height: 90,
          }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{
          mb: 1,
          textAlign: "center",
          color: "#71C9CE",
        }}
      >
        {specialty.name}
      </Typography>

      <Box
        sx={{
          mt: "auto",
          px: 1.5,
          py: 0.75,
          backgroundColor: "action.hover",
          borderRadius: 4,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          component="span"
          sx={{
            color: "#A6E3E9",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {specialty.doctorCount}{" "}
          {specialty.doctorCount === 1 ? "Doctor" : "Doctors"}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
