import React from "react";
import { Typography } from "@mui/material";

interface InfoSectionProps {
  title: string;
  content?: string | null;
  html?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content, html }) => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom mt={2}>
        {title}
      </Typography>
      {html ? (
        <Typography
          variant="body2"
          paragraph
          dangerouslySetInnerHTML={{ __html: content || "—" }}
        />
      ) : (
        <Typography variant="body2" paragraph>
          {content || "—"}
        </Typography>
      )}
    </>
  );
};

export default InfoSection;
