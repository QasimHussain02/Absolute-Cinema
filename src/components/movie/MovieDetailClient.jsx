/* eslint-disable @next/next/no-img-element */
"use client";

import { useCast } from "@/hooks/useCast";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useSimilarMovies } from "@/hooks/useSimilarMovies";
import { getCast } from "@/services/tmdb";
import { profilePicReturn, profileReturn } from "@/utils/pictureReturn";
import { formatRuntime } from "@/utils/runtimeConverter";
import SimilarMovies from "./SimilarMovies";
import CastSection from "./CastSection";
import MovieOverviewSection from "./MovieOverviewSection";
import MovieHero from "./MovieHero";

const MovieDetailClient = ({ id, movie }) => {
  const {
    data: movieDetails,
    error: movieDetailsError,
    isPending: movieDetailsLoading,
  } = useMovieDetails(id, movie);
  const { data: casts, error: castError, isPending: castLoading } = useCast(id);
  const {
    data: similarMovies,
    error: similarMoviesError,
    isPending: similarMoviesLoading,
  } = useSimilarMovies(id);

  const cast = casts?.cast;
  const genre = movieDetails.genres.map((g) => g.name).join(", ");

  const poster_paths = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const backdrop_paths = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const heroMeta = [
    Math.round(movieDetails.vote_average),
    movieDetails.release_date.split("-")[0],
    formatRuntime(movieDetails.runtime),
  ];
  const quickInfo = [
    { label: "Release Date", value: movieDetails.release_date },
    // { label: "Language", value: movie.language },
    { label: "Runtime", value: formatRuntime(movieDetails.runtime) },
    { label: "Status", value: movieDetails.status },
    {
      label: "Rating",
      value: `${movieDetails.vote_average} / 10 · ${movieDetails.vote_count}`,
    },
    { label: "genre", value: genre },
  ];

  if (movieDetailsLoading || castLoading) return <div>loading...</div>;
  if (movieDetailsError || castError)
    return (
      <div>
        An error occured, Please try again or Check your internet connection
      </div>
    );
  return (
    <div className="bg-background text-on-background">
      <MovieHero
        backdrop_paths={backdrop_paths}
        poster_paths={poster_paths}
        movieDetails={movieDetails}
        heroMeta={heroMeta}
      />

      <main className="mx-auto flex w-full max-w-container-max flex-col gap-14 px-margin-mobile py-14 md:px-margin-desktop md:gap-20 md:py-20">
        {/* Movie Details Overview */}
        <MovieOverviewSection
          movieDetails={movieDetails}
          quickInfo={quickInfo}
        />
        {/* Cast section */}
        <CastSection cast={cast} />
        {/* Similar Movies Section  */}
        <SimilarMovies movies={similarMovies} id={id} />
      </main>
    </div>
  );
};

export default MovieDetailClient;
