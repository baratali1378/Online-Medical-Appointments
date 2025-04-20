"use client";

import React from "react";
import Head from "next/head";
import { useAbout } from "@/hooks/useAboutPage";
import Loading from "../loading";
import AboutSection from "@/components/about/AboutSection";

const AboutPage: React.FC = () => {
  const { about, loading } = useAbout();

  if (loading) return <Loading />;

  if (!about) {
    throw new Error("Failed to load About data.");
  }

  try {
    return (
      <>
        <Head>
          <title>{about.seoTitle || about.title || "About HealthGate"}</title>
          <meta
            name="description"
            content="Learn about HealthGate’s mission to revolutionize healthcare access and empower patients."
          />
        </Head>

        <AboutSection about={about} />
      </>
    );
  } catch (error) {
    console.error("Rendering error in AboutPage:", error);
    throw error;
  }
};

export default AboutPage;
