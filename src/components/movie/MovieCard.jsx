import { useTrailer } from "@/hooks/useTrailer";
import { getMovieTrailer } from "@/services/tmdb";
import Link from "next/link";
import React, { useState } from "react";
import MovieTrailerModal from "./MovieTrailerModal";

export default function MovieCard({ movie, genres }) {
  const { id, title, release_date, genre_ids, vote_average, poster_path } =
    movie;
  const {
    data: trailerKey,
    error: isTrailerError,
    isPending: trailerLoading,
  } = useTrailer(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // const officialTrailers = trailers?.find(
  //   (trailer) =>
  //     trailer.site == "YouTube" &&
  //     trailer.type == "Trailer" &&
  //     trailer.official,
  // );

  const year = release_date?.split("-")[0];
  const rating = Math.round(vote_average);
  let badgeColor;
  let badgeTextClass = "text-white text-[10px]";
  const genre = movie.genre_ids
    .map((id) => genres[id])
    .join(", ")
    .split(",")[0];

  if (rating >= 8) {
    badgeColor = "bg-green-500";
  } else if (rating >= 6) {
    badgeColor = "bg-yellow-500";
    badgeTextClass = "text-black text-[10px]";
  } else {
    badgeColor = "bg-red-500";
  }
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;

  function trailerHandler() {
    if (trailerKey) {
      setVideoUrl(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
      setIsModalOpen(true);
    }
  }

  return (
<Link href={`/movie/${id}`} className="group flex flex-col gap-4">
  <div className="relative w-full pt-[150%] rounded-[16px] overflow-hidden movie-card cursor-pointer">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={poster}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
    <div
      className={`absolute top-1 right-2  px-2 py-1 rounded-full flex items-center gap-1 font-label-caps text-label-caps ${badgeTextClass || "text-white"} ${badgeColor}`}
    >
      <span className={`material-symbols-outlined text-[10px] `}>star</span>
      <span className={badgeTextClass || ""}>{rating}</span>
    </div>

    {/* Responsive Scrim Overlay */}
    <div className="movie-overlay absolute inset-0 flex flex-col justify-end p-2 md:p4 transition-all duration-300 opacity-100 bg-transparent backdrop-blur-none md:opacity-0 md:bg-black/40 md:backdrop-blur-sm md:group-hover:opacity-100">
<button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    trailerHandler(id);
  }}
  className="w-full py-1.5 md:py-2 bg-primary-container text-white rounded-lg font-label-caps text-[11px] md:text-label-caps cursor-pointer mb-1.5 md:mb-2 hover:bg-primary-container/90 transition-colors"
>
  Watch Trailer
</button>
<button className="w-full py-1.5 md:py-2 bg-transparent border border-white/20 text-white rounded-lg font-label-caps text-[11px] md:text-label-caps hover:bg-white/10 transition-colors">
  Add to List
</button>
    </div>
  </div>
  <div>
    <h3 className="font-headline-md text-body-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
      {title}
    
    </h3>
    <p className="font-metadata text-metadata text-on-surface-variant mt-1 flex items-center gap-2">
      <span>{year}</span>
      <span className="w-1 h-1 rounded-full bg-white/20"></span>
      <span>{genre}</span>
    </p>
  </div>

  <MovieTrailerModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    videoUrl={videoUrl}
  />
</Link>
  );
}
