import React from "react";
import { Box, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface ContactDetailItemProps {
  icon: SvgIconComponent;
  text?: string;
}

const ContactDetailItem: React.FC<ContactDetailItemProps> = ({
  icon: Icon,
  text,
}) => {
  if (!text) return null;

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Icon sx={{ mr: 1 }} color="primary" />
      <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default ContactDetailItem;
