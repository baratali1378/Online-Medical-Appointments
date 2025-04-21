import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography, GlobalStyles } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <>
      <GlobalStyles
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap');
        `}
      />
      <ReactMarkdown
        components={{
          h3: ({ node, ...props }) => (
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              gutterBottom
              fontFamily="'Lora', serif"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <Typography
              variant="body1"
              paragraph
              fontFamily="'Roboto', sans-serif"
              {...props}
            />
          ),
          h1: ({ node, ...props }) => (
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              fontFamily="'Lora', serif"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
              fontFamily="'Lora', serif"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <Typography
              component="li"
              fontFamily="'Roboto', sans-serif"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
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
    </>
  );
};

export default MarkdownRenderer;
