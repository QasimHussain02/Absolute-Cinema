import React from "react";
import Navbar from "@/components/layout/Navbar";
import TrendingSection from "@/components/home/TrendingSection";
import { getSearchMovie } from "@/services/tmdb";

export default async function Page() {
  return (
    <>
      <Navbar />
      <TrendingSection />
    </>
  );
}
