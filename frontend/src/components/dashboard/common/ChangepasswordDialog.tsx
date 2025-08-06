// components/ChangePasswordDialog.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useChangePassword } from "@/hooks/usePassword";
import { PasswordField } from "@/components/forms/fields/FormPasswordField";
import { BrandButton } from "./BrandButton";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  role: "doctor" | "patient";
  token: string;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
  role,
  token,
}) => {
  const changePasswordMutation = useChangePassword(role, token);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          changePasswordMutation.mutate(values, {
            onSuccess: () => {
              resetForm();
              onClose();
            },
          });
        }}
      >
        {() => (
          <Form>
            <DialogContent>
              <Stack spacing={2}>
                {changePasswordMutation.isError && (
                  <Alert severity="error">
                    {(changePasswordMutation.error as Error).message}
                  </Alert>
                )}
                {changePasswordMutation.isSuccess && (
                  <Alert severity="success">
                    Password updated successfully!
                  </Alert>
                )}
                <PasswordField
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Enter current password"
                  type={"password"}
                />
                <PasswordField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  type={"password"}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={onClose} color="error">
                Cancel
              </Button>
              <BrandButton
                type="submit"
                variant="contained"
                disabled={changePasswordMutation.isPending}
              >
                Change
              </BrandButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangePasswordDialog;
