"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import L from "leaflet";

export interface ClinicMapPickerProps {
  markerPos: L.LatLngExpression;
  setMarkerPos: (pos: [number, number]) => void;
}

export const ClinicMapPicker = ({
  markerPos,
  setMarkerPos,
}: ClinicMapPickerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(markerPos);

  const ChangeView = ({ center }: { center: L.LatLngExpression }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
      },
    });
    return markerPos ? <Marker position={markerPos} /> : null;
  };

  useEffect(() => {
    setMapCenter(markerPos);
  }, [markerPos]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle1" mb={1} fontWeight="medium">
        Pick Clinic Location on Map
      </Typography>
      <Box
        height={isMobile ? "250px" : "350px"}
        borderRadius={2}
        overflow="hidden"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        }}
      >
        <MapContainer
          center={mapCenter as [number, number]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          touchZoom={true}
          doubleClickZoom={false}
          scrollWheelZoom={true}
        >
          <ChangeView center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" mt={1}>
        Click on the map to set your clinic location
      </Typography>
    </Box>
  );
};
