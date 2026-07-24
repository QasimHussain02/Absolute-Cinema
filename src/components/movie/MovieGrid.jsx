"use client";
import React from "react";
import MovieCard from "./MovieCard";
import { useGenre, useTrendingMovies } from "@/hooks/useTrendingMovies";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Replicating the exact poster aspect ratio and border radius */}
      <div className="w-full pt-[150%] rounded-[16px] bg-white/10"></div>

      {/* Replicating the title and metadata text areas */}
      <div>
        <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-white/10 rounded w-1/2 mt-1"></div>
      </div>
    </div>
  );
};

export default function MovieGrid() {
  const {
    data: movies,
    isPending: isMovieLoading,
    error: movieError,
  } = useTrendingMovies();
  const {
    data: genres,
    isPending: isGenreLoading,
    error: genresError,
  } = useGenre();

  const isLoading = isMovieLoading || isGenreLoading;
  if (movieError || genresError)
    return (
      <div>
        An error occured. Please check your internet connection or try again
      </div>
    );
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-card-gap gap-y-12">
        {/* Render 12 skeleton cards to fill the initial screen */}
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-card-gap gap-y-12">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
}
