import { Box, Card, CardContent, Avatar } from "@mui/material";

export const SpecialtySkeleton = () => (
  <Card sx={{ minWidth: 200, flexShrink: 0 }}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ width: 90, height: 90, mb: 2 }} />
      <Box sx={{ width: "100%", height: 24, bgcolor: "grey.300", mb: 1 }} />
      <Box sx={{ width: "70%", height: 20, bgcolor: "grey.200" }} />
    </CardContent>
  </Card>
);
