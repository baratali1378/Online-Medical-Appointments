"use client";

import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
} from "@/service/profile/patient/profileService";
import { PatientProfile } from "@/types/patient";

const useProfile = (token: string) => {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile(token);
        setProfile(data);
        console.log("data", data);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (profileData: Partial<PatientProfile>) => {
    if (!token) return;

    setLoading(true);
    try {
      const updatedProfile = await updateProfile(token, profileData);
      setProfile(updatedProfile);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, handleUpdateProfile };
};

export default useProfile;
