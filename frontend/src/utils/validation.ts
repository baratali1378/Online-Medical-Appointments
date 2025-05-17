// utils/validation/patientSchema.ts
import * as Yup from "yup";

export const patientProfileSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  birth: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
});
