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
        h1: ({ ...props }) => (
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            fontFamily="'Lora', serif"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            fontFamily="'Lora', serif"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            gutterBottom
            fontFamily="'Lora', serif"
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <Typography
            variant="body1"
            paragraph
            fontFamily="'Roboto', sans-serif"
            {...props}
          />
        ),
        li: ({ ...props }) => (
          <Typography
            component="li"
            fontFamily="'Roboto', sans-serif"
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <Typography
            component="a"
            color="primary"
            fontFamily="'Roboto', sans-serif"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
