import {
  Person,
  MedicalServices,
  Event,
  People,
  EventNote,
  Home,
  Reviews,
  Notifications,
} from "@mui/icons-material";

export const patientNavItems = [
  {
    text: "Profile",
    icon: <People />,
    path: "/dashboard/patient",
  },
  {
    text: "Appointments",
    icon: <Event />,
    path: "/dashboard/patient/appointments",
  },
  {
    text: "Medical Records",
    icon: <MedicalServices />,
    path: "/dashboard/patient/medical-records",
  },
  {
    text: "Notifications",
    icon: <Notifications />,
    path: "/dashboard/patient/notifications",
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
    text: "Notifications",
    icon: <Notifications />,
    path: "/dashboard/doctor/notifications",
  },
  {
    text: "Go Home",
    icon: <Home />,
    path: "/",
  },
];
