"use client";

import React from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { useContactInfo } from "@/hooks/useContactInfo";
import ContactInfo from "@/components/contact/ContactInfo";
import Loading from "../loading";
import ContactForm from "@/components/contact/ContactForm";

const ContactPage: React.FC = () => {
  const { contact, loading, error } = useContactInfo();

  if (loading) return <Loading />;

  if (error || !contact) {
    throw new Error(error || "Failed to load contact information.");
  }

  try {
    return (
      <>
        <Head>
          <title>Contact Us | HealthGate</title>
          <meta
            name="description"
            content="Get in touch with HealthGate. Find our address, email, phone, and social media links."
          />
        </Head>

        <Container maxWidth="lg">
          <ContactInfo contact={contact} />
          <ContactForm />
        </Container>
      </>
    );
  } catch (err) {
    console.error("Rendering error in ContactPage:", err);
    throw err;
  }
};

export default ContactPage;
