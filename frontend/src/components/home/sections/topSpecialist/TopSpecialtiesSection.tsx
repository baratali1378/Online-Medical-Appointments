"use client";

import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTopSpecialties } from "@/hooks/useTopSpecialties";
import { SectionHeading } from "./SpecialtySectionHeading";
import { SpecialtyCard } from "./SpecialtyCard";
import { SpecialtySkeleton } from "./SpecialtySkeleton";
import { SliderControls } from "./SpecialtySliderControls";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function TopSpecialtiesSection() {
  const { data, isLoading, error } = useTopSpecialties(6);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (error) {
    return (
      <Box sx={{ px: 1, py: 6, textAlign: "left" }}>
        <SectionHeading>Most Viewed Specialties</SectionHeading>
        <Typography color="error">Failed to load specialties</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6, md: 8 },
        bgcolor: "background.default",
      }}
    >
      <SectionHeading>Most Viewed Specialties</SectionHeading>

      <Box sx={{ position: "relative", maxWidth: 1200, mx: "auto" }}>
        {!isMobile && (
          <>
            <SliderControls
              direction="prev"
              onClick={() => {}}
              position={{ left: -20 }}
            />
            <SliderControls
              direction="next"
              onClick={() => {}}
              position={{ right: -20 }}
            />
          </>
        )}

        {isLoading ? (
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
            {[...Array(6)].map((_, i) => (
              <SpecialtySkeleton key={i} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              pb: 6, // Increased padding to accommodate dots
              "& .swiper-pagination": {
                bottom: "0px !important", // Position dots at the very bottom
                position: "absolute",
                zIndex: 0, // Ensure dots appear behind cards
              },
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: ".specialty-prev",
                nextEl: ".specialty-next",
                enabled: !isMobile,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                enabled: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              loop
              grabCursor
              centeredSlides={isMobile}
              style={{
                paddingBottom: "24px", // Add space for dots
              }}
            >
              {data?.map((specialty) => (
                <SwiperSlide key={specialty.id}>
                  <SpecialtyCard specialty={specialty} API_URL={API_URL} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Box>
    </Box>
  );
}
