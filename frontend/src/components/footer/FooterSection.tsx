import { Typography, Box } from "@mui/material";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection = ({ title, children }: FooterSectionProps) => (
  <Box mb={4}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: "bold",
        textTransform: "uppercase",
        mb: 2,
        color: "#71C9CE",
        fontSize: "1rem",
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default FooterSection;
