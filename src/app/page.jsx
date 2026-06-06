import React from "react";
import Navbar from "@/components/layout/Navbar";
import TrendingSection from "@/components/home/TrendingSection";
import { getSearchMovie } from "@/services/tmdb";

export default async function Page() {
  // testing
  const search = await getSearchMovie();
  console.log(search);

  return (
    <>
      <Navbar />
      <TrendingSection />
    </>
  );
}
