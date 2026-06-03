import React from "react";
import Hero from "./TrendingHero";
import MovieGrid from "../movie/MovieGrid";
import TrendingHero from "./TrendingHero";
import { getGenres } from "@/services/tmdb";

export default function TrendingSection() {
  return (
    <main className="pt-[100px] md:pt-[120px] pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <TrendingHero />
      <MovieGrid />
    </main>
  );
}
