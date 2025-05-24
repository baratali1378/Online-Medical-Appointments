import { Box, Typography } from "@mui/material";
import Image from "next/image";

const ImageSide = ({
  src,
  alt,
  title = "Join Our Medical Community",
  subtitle = "Connect with patients and grow your practice with our platform",
  width = 800,
  height = 800,
}: {
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={5}
      sx={{
        background:
          "linear-gradient(135deg,rgb(148, 242, 247) 0%,rgb(111, 164, 188) 100%)",
        color: "white",
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(19, 18, 18, 0.2)",
        minHeight: 500,
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          overflow: "hidden",
          maxWidth: "100%",
          mb: 3,
          width: "100%",
        }}
      >
        <Image
          src={src || "/default-medical.jpg"}
          alt={alt || "Medical Community"}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </Box>
      <Typography variant="h5" fontWeight="700" mb={1} letterSpacing={1.2}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.85, fontSize: "1.1rem" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ImageSide;
