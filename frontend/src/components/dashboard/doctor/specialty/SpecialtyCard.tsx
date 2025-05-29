"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import {
  Box,
  CircularProgress,
  Typography,
  Grid2,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Doctor } from "@/types/doctor";
import { useSpecialtiesQuery } from "@/hooks/useSpecialtiesQuery";
import { BrandButton } from "../../common/BrandButton";
import { SpecialtyItem } from "./SpecialtyItem"; // Make sure path is correct

interface SpecialtiesCardProps {
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

export const SpecialtiesCard = ({
  doctor,
  onUpdate,
  loading,
}: SpecialtiesCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { data: specialties = [], isLoading: specialtiesLoading } =
    useSpecialtiesQuery();

  const initialValues = {
    specialties: doctor.specialties?.map((s) => s.id.toString()) || [],
  };

  const validationSchema = Yup.object({
    specialties: Yup.array().min(1, "Select at least one specialty"),
  });

  const getGridColumns = () => {
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 4;
  };

  return (
    <BaseCard title="Specialties">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onUpdate({
            specialties: specialties.filter((spec) =>
              values.specialties.includes(spec.id.toString())
            ),
          });
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched, dirty }) => (
          <Form>
            {specialtiesLoading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={28} sx={{ color: "#A6E3E9" }} />
              </Box>
            ) : specialties.length === 0 ? (
              <Typography color="text.secondary">
                No specialties available.
              </Typography>
            ) : (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  Select one or more specialties:
                </Typography>

                <Grid2 container spacing={2}>
                  {specialties.map((spec) => {
                    const isChecked = values.specialties.includes(
                      spec.id.toString()
                    );

                    return (
                      <SpecialtyItem
                        key={spec.id}
                        spec={spec}
                        isChecked={isChecked}
                        loading={loading}
                        getGridColumns={getGridColumns}
                        onToggle={() => {
                          const id = spec.id.toString();
                          const updated = isChecked
                            ? values.specialties.filter((s) => s !== id)
                            : [...values.specialties, id];
                          setFieldValue("specialties", updated);
                        }}
                      />
                    );
                  })}
                </Grid2>

                {touched.specialties && errors.specialties && (
                  <Typography color="error" mt={2} variant="body2">
                    {(errors.specialties as string) || ""}
                  </Typography>
                )}
              </Box>
            )}

            <Box
              mt={4}
              display="flex"
              justifyContent="flex-end"
              sx={{
                paddingX: isMobile ? 1 : 0,
              }}
            >
              <BrandButton
                type="submit"
                loading={isSubmitting || loading || specialtiesLoading}
                disabled={
                  !dirty || isSubmitting || loading || specialtiesLoading
                }
                fullWidth={isMobile}
                size={isMobile ? "small" : "medium"}
              >
                Save Changes
              </BrandButton>
            </Box>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
