import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

const DoctorPage = () => {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          دکتری
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom align="center">
          نوبت‌دهی اینترنتی و مشاوره آنلاین پزشکان ایران
        </Typography>
      </Box>

      {/* Search Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          انتخاب شهر
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          نام پزشک، تخصصی، بیماری، مرکز درمانی، خدمت و...
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField select label="شهر" variant="outlined" fullWidth>
              <MenuItem value="tehran">تهران</MenuItem>
              <MenuItem value="mashhad">مشهد</MenuItem>
              <MenuItem value="isfahan">اصفهان</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="جستجو پزشک، تخصص، بیماری..."
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5" color="primary">
              +1,345
            </Typography>
            <Typography variant="subtitle1">شهر و روستا</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5" color="primary">
              +15,000,000
            </Typography>
            <Typography variant="subtitle1">نوبت موفق</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5" color="primary">
              +50,000
            </Typography>
            <Typography variant="subtitle1">پزشک</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorPage;
