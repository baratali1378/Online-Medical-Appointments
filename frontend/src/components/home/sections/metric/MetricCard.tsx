"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

type MetricCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading: boolean;
};

export default function MetricCard({
  title,
  value,
  icon,
  isLoading,
}: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Card
      ref={ref}
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      sx={{
        textAlign: "center",
        p: 1.5, // reduced padding
        borderRadius: 3, // slightly smaller radius
        background: "linear-gradient(135deg, #ffffff, #f0f9ff)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        maxWidth: 260, // limit width for smaller look
        margin: "auto",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1.5,
            fontSize: 32, // smaller icon
            color: "#A6E3E9",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h5" // smaller than h4
          fontWeight="bold"
          color="#71C9CE"
          sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
        >
          {value == 0 ? "" : "+"}
          <AnimatedCounter
            value={value}
            isActive={isInView && !isLoading}
            duration={1.5}
          />
        </Typography>
        <Typography
          variant="subtitle2"
          color="#71C9CE"
          sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
