"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { Person, ArrowForwardIos } from "@mui/icons-material";

interface DoctorCardProps {
  id: string;
  fullname: string;
  email: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ id, fullname, email }) => {
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 4,
        boxShadow: 2,
        background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
        "&:hover": {
          boxShadow: 5,
          transform: "translateY(-3px)",
          transition: "0.3s ease",
        },
        transition: "0.3s ease",
      }}
    >
      <Link
        href={`/dashboard/doctor/${id}`}
        passHref
        style={{ textDecoration: "none" }}
      >
        <CardActionArea>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  fontSize: 28,
                }}
              >
                <Person fontSize="inherit" />
              </Avatar>

              <Box flexGrow={1}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {fullname}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {email}
                </Typography>
              </Box>

              <ArrowForwardIos sx={{ color: "primary.main", fontSize: 16 }} />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default DoctorCard;
