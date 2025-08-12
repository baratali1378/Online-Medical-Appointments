import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { Review } from "@/types/doctor";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  reviews: Review[];
}

export default function DoctorReviews({ reviews }: Props) {
  if (!reviews?.length) {
    return <Typography>No reviews yet.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Patient Reviews
      </Typography>
      <Stack spacing={2}>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={review.patient.personal_info.image?.url} />
                <Box>
                  <Typography fontWeight="bold">
                    {review.patient.personal_info.fullname}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <StarIcon color="warning" fontSize="small" />
                    <Typography>{review.rating}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
              <Typography mt={1}>{review.comment}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
