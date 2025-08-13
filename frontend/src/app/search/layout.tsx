"use client";

import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { SearchSidebar } from "@/components/search/sidebar/SearchSidebar";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import { useSpecialtiesQuery } from "@/hooks/useSpecialtiesQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterValues } from "@/types/search";

const drawerWidth = 320;

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Fetch cities and specialties
  const { data: citiesData, isLoading: citiesLoading } = useCitiesQuery();
  const { data: specialtiesData, isLoading: specialtiesLoading } =
    useSpecialtiesQuery();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const cities =
    !citiesLoading && citiesData ? citiesData.map((c) => c.name) : [];
  const specialties =
    !specialtiesLoading && specialtiesData
      ? specialtiesData.map((s) => s.name)
      : [];

  // ✅ This runs whenever filters are applied
  const handleFilterChange = (filters: FilterValues) => {
    const params = new URLSearchParams();

    if (filters.city) params.set("city", filters.city);
    if (filters.specialty) params.set("specialty", filters.specialty);
    if (filters.query) params.set("q", filters.query);
    if (filters.verifiedOnly) params.set("verified", "true");
    if (filters.minRating) params.set("minRating", String(filters.minRating));
    router.push(`?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: -2 }}>
      <CssBaseline />

      {/* Desktop Sidebar */}
      {isDesktop && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <SearchSidebar
            initialFilters={{
              city: searchParams.get("city") || "",
              specialty: searchParams.get("specialty") || "",
              query: searchParams.get("q") || "",
              verifiedOnly: searchParams.get("verified") === "true",
              minRating: Number(searchParams.get("minRating")) || 0,
            }}
            cities={cities}
            specialties={specialties}
            onFilterChange={handleFilterChange}
          />
        </Box>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ overflowY: "auto", height: "100%" }}>
            <SearchSidebar
              isMobile
              onClose={handleDrawerToggle}
              initialFilters={{
                city: searchParams.get("city") || "",
                specialty: searchParams.get("specialty") || "",
                query: searchParams.get("q") || "",
                verifiedOnly: searchParams.get("verified") === "true",
                minRating: Number(searchParams.get("minRating")) || 0,
              }}
              cities={cities}
              specialties={specialties}
              onFilterChange={handleFilterChange}
            />
          </Box>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f9fafb",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
