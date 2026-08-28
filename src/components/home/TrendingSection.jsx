import React from "react";
import TrendingHero from "./TrendingHero";
import MovieGrid from "../movie/MovieGrid";

export default function TrendingSection() {
  return (
    <main className="pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <TrendingHero />
      <MovieGrid />
    </main>
  );
}

