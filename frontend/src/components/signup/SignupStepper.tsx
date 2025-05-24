"use client";

import {
  Box,
  Button,
  Grid2,
  Step,
  StepLabel,
  Stepper,
  useTheme,
  useMediaQuery,
  StepConnector,
  styled,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { FormSubmitButton } from "@/components/forms/fields/FormSubmitButton";

// Custom connector for more beautiful stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: "calc(-50% + 16px)",
  right: "calc(50% + 16px)",
  "& .MuiStepConnector-line": {
    borderTopWidth: 3,
    borderColor: theme.palette.grey[300],
  },
}));

interface SignupStepperProps {
  steps: string[];
  initialValues: any;
  validationSchemas: any[];
  onSubmit: (values: any, helpers: any) => Promise<void>;
  children: React.ReactNode[];
  submitButtonText?: string;
  imageSide?: React.ReactNode;
}

const SignupStepper = ({
  steps,
  initialValues,
  validationSchemas,
  onSubmit,
  children,
  submitButtonText = "Finish",
  imageSide,
}: SignupStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (values: any, helpers: any) => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      setLoading(true);
      try {
        await onSubmit(values, helpers);
      } finally {
        setLoading(false);
      }
    }
  };

  const gridMdSize = imageSide && !isMobile ? 6 : 12;

  return (
    <Grid2 container spacing={4} alignItems="center">
      {imageSide && !isMobile && (
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            {imageSide}
          </Box>
        </Grid2>
      )}

      <Grid2 size={{ xs: 12, md: gridMdSize }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({ status }) => (
            <Form noValidate>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<CustomConnector />}
                sx={{
                  mb: 4,
                  "& .MuiStepLabel-root": {
                    "& .MuiStepIcon-root": {
                      color: theme.palette.grey[300],
                      "&.Mui-active": {
                        color: "#71C9CE",
                      },
                      "&.Mui-completed": {
                        color: theme.palette.success.main,
                      },
                    },
                    "& .MuiStepLabel-label": {
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: theme.palette.text.secondary,
                    },
                    "&.Mui-active .MuiStepLabel-label": {
                      color: "#71C9CE",
                    },
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box minHeight={320} mb={3}>
                {children[activeStep]}
              </Box>

              {status?.apiError && (
                <Box mt={2} color="error.main" textAlign="center">
                  {status.apiError}
                </Box>
              )}

              <Box display="flex" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    px: 5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: theme.palette.grey[400],
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      boxShadow: "0 2px 10px rgba(33, 150, 243, 0.2)",
                    },
                  }}
                >
                  Back
                </Button>

                <FormSubmitButton loading={loading}>
                  {activeStep === steps.length - 1 ? submitButtonText : "Next"}
                </FormSubmitButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid2>
    </Grid2>
  );
};

export default SignupStepper;
