import {
  Person,
  MedicalServices,
  Event,
  People,
  EventNote,
  Home,
  Reviews,
} from "@mui/icons-material";

export const patientNavItems = [
  {
    text: "Profile",
    icon: <People />,
    path: "/dashboard/patient/profile",
  },
  {
    text: "Appointments",
    icon: <Event />,
    path: "/dashboard/patient/appointments",
  },
  {
    text: "Doctors",
    icon: <Person />,
    path: "/dashboard/patient/doctors",
  },
  {
    text: "Medical Records",
    icon: <MedicalServices />,
    path: "/dashboard/patient/records",
  },
  {
    text: "Go Home",
    icon: <Home />,
    path: "/",
  },
];

export const doctorNavItems = [
  {
    text: "Profile",
    icon: <People />,
    path: "/dashboard/doctor",
  },
  {
    text: "Reviews",
    icon: <Reviews />,
    path: "/dashboard/doctor/reviews",
  },
  {
    text: "Patients",
    icon: <People />,
    path: "/dashboard/doctor/patients",
  },
  {
    text: "Appointments",
    icon: <EventNote />,
    path: "/dashboard/doctor/appointments",
  },
  {
    text: "Go Home",
    icon: <Home />,
    path: "/",
  },
];
