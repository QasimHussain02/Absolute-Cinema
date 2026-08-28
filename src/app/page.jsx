import React from "react";
import CinematicHero from "@/components/home/CinematicHero";
import TrendingSection from "@/components/home/TrendingSection";

export default async function Page() {
  return (
    <>
      <CinematicHero />
      <TrendingSection />
    </>
  );
}
