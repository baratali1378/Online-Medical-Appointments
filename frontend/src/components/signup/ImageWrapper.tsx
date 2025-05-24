import { Box, Typography } from "@mui/material";
import Image from "next/image";

const ImageSide = ({
  src = "/doctor_signup.jpg",
  alt = "Doctor signing up",
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
      p={4}
    >
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
      <Typography variant="h6" mt={3} fontWeight="bold" color="#71C9CE">
        {title}
      </Typography>
      <Typography variant="body1" mt={1} color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ImageSide;
