"use client";

import { useMetric } from "@/hooks/useMetric";
import { Grid } from "@mui/material";
import MetricCard from "./MetricCard";
import { motion } from "framer-motion";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function MetricDisplay() {
  const { data, isLoading } = useMetric();

  const metrics = [
    {
      title: "Cities and Towns",
      value: data?.totalCities || 0,
      icon: <LocationCityIcon />,
    },
    {
      title: "Doctors",
      value: data?.totalDoctors || 0,
      icon: <LocalHospitalIcon />,
    },
    {
      title: "ُSuccessful Appointments",
      value: data?.successfulAppointments || 0,
      icon: <EventAvailableIcon />,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
        hidden: {},
      }}
    >
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={4} key={metric.title}>
          <MetricCard
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            isLoading={isLoading}
          />
        </Grid>
      ))}
    </Grid>
  );
}
