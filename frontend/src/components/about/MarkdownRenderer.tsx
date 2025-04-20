import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h3: ({ node, ...props }) => (
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <Typography variant="body1" paragraph {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
