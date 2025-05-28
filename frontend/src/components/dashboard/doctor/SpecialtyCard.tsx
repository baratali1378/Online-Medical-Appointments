"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form } from "formik";
import { Doctor } from "@/types/doctor";
import { useSpecialtiesQuery } from "@/hooks/useSpecialtiesQuery";
import * as Yup from "yup";
import { BrandButton } from "../common/BrandButton";

interface SpecialtiesCardProps {
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

const BRAND_COLOR = "#A6E3E9";
const BRAND_HOVER = "#90dbe2";
const BRAND_LIGHT_BG = "#e7f9fa";

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
                <CircularProgress size={28} sx={{ color: BRAND_COLOR }} />
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

                <Grid container spacing={2}>
                  {specialties.map((spec) => {
                    const isChecked = values.specialties.includes(
                      spec.id.toString()
                    );

                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={getGridColumns()}
                        key={spec.id}
                      >
                        <Paper
                          elevation={isChecked ? 3 : 1}
                          sx={{
                            px: isMobile ? 1 : 2,
                            py: isMobile ? 1 : 1.5,
                            borderRadius: 2,
                            backgroundColor: isChecked
                              ? BRAND_LIGHT_BG
                              : theme.palette.background.paper,
                            border: `2px solid ${
                              isChecked ? BRAND_COLOR : theme.palette.divider
                            }`,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              boxShadow: `0 0 0 2px ${BRAND_COLOR}`,
                              borderColor: BRAND_COLOR,
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => {
                            const id = spec.id.toString();
                            const updated = isChecked
                              ? values.specialties.filter((s) => s !== id)
                              : [...values.specialties, id];
                            setFieldValue("specialties", updated);
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {}}
                                sx={{
                                  color: BRAND_COLOR,
                                  "&.Mui-checked": {
                                    color: BRAND_COLOR,
                                  },
                                }}
                                disabled={loading}
                                size={isMobile ? "small" : "medium"}
                              />
                            }
                            label={
                              <Typography
                                fontWeight={isChecked ? 600 : 400}
                                color={
                                  isChecked ? "text.primary" : "text.secondary"
                                }
                                variant={isMobile ? "body2" : "body1"}
                              >
                                {spec.name}
                              </Typography>
                            }
                            sx={{
                              marginRight: isMobile ? 0.5 : 1,
                              marginLeft: isMobile ? -1 : -0.5,
                            }}
                          />
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

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
