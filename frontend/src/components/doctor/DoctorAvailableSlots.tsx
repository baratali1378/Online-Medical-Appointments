import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { AvailableSlot } from "@/types/doctor";

interface Props {
  slots: AvailableSlot[];
  doctorId: number;
}

export default function DoctorAvailableSlots({ slots, doctorId }: Props) {
  if (!slots?.length) {
    return <Typography>No available slots at the moment.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Available Slots
      </Typography>
      <Grid container spacing={2}>
        {slots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{slot.days}</Typography>
                <Typography variant="body2">
                  {slot.start_time} - {slot.end_time}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Book this slot
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
