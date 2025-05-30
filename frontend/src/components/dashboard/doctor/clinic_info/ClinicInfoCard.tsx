"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { Doctor } from "@/types/doctor";
import { ClinicMapPicker } from "./ClinicMapPicker";
import { ClinicFormFields } from "./ClinicFormField";
import * as Yup from "yup";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Type-safe Leaflet Icon Fix
const defaultIcon = L.Icon.Default.prototype as any;
delete defaultIcon._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Validation Schema
const clinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string()
    .required("Clinic name is required")
    .min(3, "Clinic name must be at least 3 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
});

interface ClinicInfoCardProps {
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

export const ClinicInfoCard = ({
  doctor,
  onUpdate,
  loading,
}: ClinicInfoCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [markerPos, setMarkerPos] = useState<[number, number]>([
    doctor.clinic_info?.latitude || 34.5553, // Default: Kabul
    doctor.clinic_info?.longitude || 69.2075,
  ]);

  const initialValues = {
    clinic_name: doctor.clinic_info?.clinic_name || "",
    address: doctor.clinic_info?.address || "",
    phone: doctor.clinic_info?.phone || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await onUpdate({
        clinic_info: {
          ...values,
          latitude: markerPos[0],
          longitude: markerPos[1],
        },
      });
    } catch (error) {
      console.error("Failed to update clinic info:", error);
    }
  };

  return (
    <BaseCard title="Clinic Information">
      <Formik
        initialValues={initialValues}
        validationSchema={clinicValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, isValid, resetForm }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <ClinicFormFields />

              <Box mt={2}>
                <ClinicMapPicker
                  markerPos={markerPos}
                  setMarkerPos={setMarkerPos}
                />
              </Box>

              <Box
                mt={2}
                display="flex"
                justifyContent="flex-end"
                gap={2}
                flexDirection={isMobile ? "column" : "row"}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    resetForm();
                    setMarkerPos([
                      doctor.clinic_info?.latitude || 34.5553,
                      doctor.clinic_info?.longitude || 69.2075,
                    ]);
                  }}
                  disabled={isSubmitting || loading || !dirty}
                  fullWidth={isMobile}
                >
                  Reset
                </Button>
                <BrandButton
                  type="submit"
                  loading={isSubmitting || loading}
                  disabled={!dirty || isSubmitting || loading || !isValid}
                  fullWidth={isMobile}
                >
                  Save Clinic Information
                </BrandButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
