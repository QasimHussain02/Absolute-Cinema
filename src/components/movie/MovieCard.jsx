import { useTrailer } from "@/hooks/useTrailer";
import { getMovieTrailer } from "@/services/tmdb";
import Link from "next/link";
import React, { useState } from "react";
import MovieTrailerModal from "./MovieTrailerModal";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function MovieCard({
  movie,
  genres,
  showTrailerModal = true,
  showGenre = true,
  ratingStyle = "badge",
  size = "default",
  showOverlay = true,
}) {
  const { id, title, release_date, genre_ids, vote_average, poster_path } =
    movie;

  const {
    data: trailerKey,
    error: isTrailerError,
    isPending: trailerLoading,
  } = useTrailer(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const year = release_date?.split("-")[0];
  const rating = Math.round(vote_average);
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;

  // Genre handling (only if genres prop is provided and showGenre is true)
  const genre =
    showGenre && genres && movie.genre_ids
      ? movie.genre_ids
          .map((id) => genres[id])
          .join(", ")
          .split(",")[0]
      : null;

  // Badge color logic
  let badgeColor;
  let badgeTextClass = "text-white text-[10px]";
  if (rating >= 8) {
    badgeColor = "bg-green-500";
  } else if (rating >= 6) {
    badgeColor = "bg-yellow-500";
    badgeTextClass = "text-black text-[10px]";
  } else {
    badgeColor = "bg-red-500";
  }

  // Size variants
  const sizeClasses = {
    default: {
      container: "w-full pt-[150%] rounded-[16px]",
      overlayPadding: "p-2 md:p-4",
      buttonText: "text-[11px] md:text-label-caps py-1.5 md:py-2",
      title: "font-headline-md text-body-md",
      metadata: "font-metadata text-metadata",
    },
    compact: {
      container: "w-full aspect-[2/3] rounded-xl",
      overlayPadding: "p-3",
      buttonText: "text-xs py-2",
      title: "text-sm font-semibold",
      metadata: "text-xs",
    },
  };

  const classes = sizeClasses[size];

  function trailerHandler() {
    if (trailerKey) {
      setVideoUrl(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
      setIsModalOpen(true);
    } else {
      toast.error("Trailer not available");
    }
  }

  return (
    <>
      <Link href={`/movie/${id}`} className="group flex flex-col gap-4">
        <div
          className={`relative ${classes.container} overflow-hidden movie-card cursor-pointer`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          {/* Rating Badge */}
          {ratingStyle === "badge" && (
            <div
              className={`absolute top-1 right-2 px-2 py-1 rounded-full flex items-center gap-1 font-label-caps text-label-caps ${badgeTextClass || "text-white"} ${badgeColor}`}
            >
              <span className="material-symbols-outlined text-[10px]">
                star
              </span>
              <span className={badgeTextClass || ""}>{rating}</span>
            </div>
          )}

          {ratingStyle === "star" && (
            <div className="flex items-center text-xs text-zinc-400 gap-2">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                {vote_average.toFixed(1)}
              </span>
            </div>
          )}

          {ratingStyle === "simple" && (
            <div className="absolute bg-yellow-500 top-2 right-2 px-2 py-1 rounded font-['Plus_Jakarta_Sans',sans-serif] text-[13px] leading-none font-medium text-black">
              {rating}/10
            </div>
          )}

          {/* Hover Scrim Overlay */}
          {showOverlay && (
            <div
              className={`movie-overlay absolute inset-0 flex flex-col justify-end ${classes.overlayPadding} transition-all duration-300opacity-100 md:opacity-0 md:group-hover:opacity-100
              }`}
            >
              {showTrailerModal && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    trailerHandler(id);
                  }}
                  className={`w-full ${classes.buttonText} bg-primary-container text-white rounded-lg font-label-caps cursor-pointer mb-1.5 md:mb-2 hover:bg-primary-container/90 transition-colors`}
                >
                  Watch Trailer
                </button>
              )}
              <button
                className={`w-full ${classes.buttonText} bg-transparent border border-white/20 text-white rounded-lg font-label-caps hover:bg-white/10 transition-colors`}
              >
                Add to List
              </button>
            </div>
          )}
        </div>

        <div>
          <h3
            className={`${classes.title} font-semibold text-on-surface truncate group-hover:text-primary transition-colors`}
          >
            {title}
          </h3>
          <p
            className={`${classes.metadata} text-on-surface-variant mt-1 flex items-center gap-2`}
          >
            <span>{year}</span>
            {genre && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>{genre}</span>
              </>
            )}
          </p>
        </div>
      </Link>

      {showTrailerModal && (
        <MovieTrailerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={videoUrl}
        />
      )}
    </>
  );
}
