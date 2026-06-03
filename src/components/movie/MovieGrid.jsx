"use client";
import React from "react";
import MovieCard from "./MovieCard";
import { useGenre, useTrendingMovies } from "@/hooks/useTrendingMovies";

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
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-card-gap gap-y-12">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
}
