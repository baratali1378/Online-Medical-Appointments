"use client";

import React from "react";
import SideImage from "@/components/login/AuthSideImage";
import AuthLayout from "@/components/login/LoginLayout";
import LoginForm from "@/components/login/LoginForm";
import withAuthHandler from "../login/withAuthHandler";

const Login = withAuthHandler(LoginForm);

interface LoginProp {
  image_url: string;
  image_alt: string;
  user_role: "doctor" | "patient";
}

const LoginPage: React.FC<LoginProp> = ({
  image_alt,
  image_url,
  user_role,
}) => {
  return (
    <AuthLayout
      sideImage={<SideImage imageUrl={image_url} altText={image_alt} />}
      formComponent={<Login role={user_role} />}
    />
  );
};

export default LoginPage;
