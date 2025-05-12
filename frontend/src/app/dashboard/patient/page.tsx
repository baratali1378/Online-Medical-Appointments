"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import useProfile from "@/hooks/profile/usePatient";
import { ProfileData } from "@/types/patient";
import { Button, TextField, CircularProgress } from "@mui/material";

const ProfilePage = () => {
  const { data: session } = useSession();

  console.log(session?.user.token);

  const { profile, loading, error, handleUpdateProfile } = useProfile(
    session?.user.token || ""
  );

  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileData | null>(profile);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  const handleEdit = () => {
    setEditing(true);
    setFormData(profile); // Pre-fill form with current profile
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(profile); // Reset form data if canceled
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData!, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData) return;
    await handleUpdateProfile(formData);
    setEditing(false); // Turn off editing after save
  };

  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <div>
            <p>Full Name: {profile.fullname}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Image: {profile.image || "No image uploaded"}</p>
          </div>
          {editing ? (
            <div>
              <TextField
                label="Full Name"
                name="fullname"
                value={formData?.fullname || ""}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
                fullWidth
              />
              <div>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
