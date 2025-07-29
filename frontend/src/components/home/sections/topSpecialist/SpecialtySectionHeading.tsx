import { Typography } from "@mui/material";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export const SectionHeading = ({ children }: SectionHeadingProps) => (
  <Typography
    variant="h4"
    fontWeight={700}
    sx={{
      mb: { xs: 3, md: 5 },
      textAlign: "left",
      color: "#71C9CE",
      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
    }}
  >
    {children}
  </Typography>
);
