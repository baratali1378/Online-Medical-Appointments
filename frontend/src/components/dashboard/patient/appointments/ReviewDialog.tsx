"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Rating,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCreatePatientReview } from "@/hooks/profile/patient/useReview";

// Emoji feedback based on rating
const getRatingEmoji = (value: number | null) => {
  switch (value) {
    case 1:
      return "😠 Terrible";
    case 2:
      return "😕 Poor";
    case 3:
      return "😐 Okay";
    case 4:
      return "😊 Good";
    case 5:
      return "😍 Excellent";
    default:
      return "";
  }
};

const validationSchema = Yup.object({
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Minimum rating is 1 star"),
  comment: Yup.string().max(500, "Comment should be under 500 characters"),
});

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: { id: number };
  token: string;
}

export const ReviewDialog = ({
  open,
  onClose,
  appointment,
  token,
}: ReviewDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const createReviewMutation = useCreatePatientReview(token);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, p: isMobile ? 1 : 2 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
        Leave a Review
      </DialogTitle>

      <Formik
        initialValues={{
          rating: 0,
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          createReviewMutation.mutate(
            {
              appointmentId: appointment.id,
              rating: values.rating,
              comment: values.comment,
            },
            {
              onSuccess: () => {
                resetForm();
                onClose();
              },
            }
          );
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <DialogContent>
              {/* Star Rating */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <Rating
                  name="rating"
                  value={values.rating}
                  onChange={(_, value) => setFieldValue("rating", value)}
                  size={isMobile ? "medium" : "large"}
                  precision={1}
                />

                {/* Animated Emoji Feedback */}
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    transition: "all 0.3s ease",
                    transform: values.rating ? "scale(1)" : "scale(0.9)",
                    opacity: values.rating ? 1 : 0.5,
                  }}
                >
                  {values.rating > 0 && (
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "2rem", // bigger emoji
                        lineHeight: 1,
                      }}
                    >
                      {getRatingEmoji(values.rating).split(" ")[0]}{" "}
                      {/* Emoji part */}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      backgroundColor: "#f0f4f8",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 20,
                    }}
                  >
                    {getRatingEmoji(values.rating)
                      .split(" ")
                      .slice(1)
                      .join(" ")}{" "}
                    {/* Text part */}
                  </Typography>
                </Box>

                {errors.rating && touched.rating && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.rating}
                  </Typography>
                )}
              </Box>

              {/* Comment Field */}
              <Field
                as={TextField}
                name="comment"
                label="Your comment (optional)"
                multiline
                rows={4}
                fullWidth
                value={values.comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue("comment", e.target.value)
                }
                error={touched.comment && Boolean(errors.comment)}
                helperText={touched.comment && errors.comment}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={onClose}
                color="error"
                variant="outlined"
                fullWidth={isMobile}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                disabled={createReviewMutation.isPending}
                sx={{
                  background: "linear-gradient(135deg, #4CAF50, #81C784)",
                  fontWeight: 600,
                  "&:hover": {
                    background: "linear-gradient(135deg, #43A047, #66BB6A)",
                  },
                }}
              >
                Submit Review
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
