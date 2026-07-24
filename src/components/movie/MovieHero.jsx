import React from "react";
import { useWatchList } from "@/hooks/useWatchlist";
import { addToWatchlist } from "../../services/watchlist";
import { Check } from "lucide-react";

const MovieHero = ({
  backdrop_paths,
  movieDetails,
  poster_paths,
  heroMeta,
  movie,
  size = "default",
}) => {
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

  const { addMovie, removeMovie, isAlreadyExists } = useWatchList();
  const inList = isAlreadyExists(movie);
  return (
    <section className="relative isolate flex min-h-[300px] items-end overflow-hidden pt-24 md:min-h-[500px] md:pt-28">
      <div className="absolute inset-0">
        <img
          src={backdrop_paths}
          alt="Neon-lit futuristic city street at night"
          className="h-full w-full scale-105 object-cover object-center opacity-100"
        />
        {/* Subtle color glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,173,181,0.2),transparent_80%),radial-gradient(circle_at_top_right,rgba(229,9,20,0.15),transparent_30%)]" />

        {/* Vertical Gradient - Lightened the 'via' and 'to' sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#090909]/50 to-transparent" />

        {/* Horizontal Gradient - Lightened the side-fade to show more of the right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-container-max flex-col gap-10 px-margin-mobile pb-14 md:px-margin-desktop md:pb-20 lg:flex-row lg:items-end lg:gap-12">
        <div className="w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low shadow-[0_24px_80px_rgba(0,0,0,0.65)] md:w-56 lg:translate-y-8">
          <img
            src={poster_paths}
            alt={`${movieDetails.title} poster`}
            className="aspect-[2/3] h-full w-full object-cover"
          />
        </div>

        <div className="max-w-4xl flex-1">
          <div className="mb-5 flex flex-wrap gap-2.5 text-label-caps uppercase tracking-[0.18em] text-surface-tint/90">
            {heroMeta.map((item, idx) => (
              <span
                key={item}
                className="badge-glass rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-on-background/88"
              >
                {item} {idx == 0 ? " ratings" : ""}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <h1 className="max-w-3xl font-display-lg-mobile text-display-lg-mobile text-white md:font-display-lg md:text-display-lg">
              {movieDetails.title}
            </h1>
            <p className="max-w-2xl font-headline-md text-headline-md text-on-surface-variant/90">
              {movieDetails.tagline}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className={` ${classes.buttonText} flex items-center justify-center gap-1.5 border-white/10 bg-white/6 font-label-caps transition-all duration-200 px-5 rounded-full
                    ${
                      inList
                        ? "bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                        : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                    }`}
              onClick={(e) =>
                addToWatchlist(
                  e,
                  movie,
                  inList,
                  addMovie,
                  removeMovie,
                  movieDetails.title,
                )
              }
            >
              {inList ? (
                <>
                  <Check size={12} />
                  <span>Added</span>
                </>
              ) : (
                "Add to Watchlist"
              )}
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 font-metadata text-metadata text-white/92 backdrop-blur-xl transition-colors duration-300 hover:bg-white/12">
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
