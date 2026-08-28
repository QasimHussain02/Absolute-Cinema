"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Plus, Info, Star } from "lucide-react";
import { useTrendyMovies } from "../../hooks/useTrendyMovies";
import { useGenre } from "../../hooks/useTrendingMovies";

/* ─────────────────────────────────────────────────────────────
   Slide data  (6 featured films, each with a unique Unsplash bg)
───────────────────────────────────────────────────────────── */
// const SLIDES = [
//   {
//     id: 0,
//     title: "Interstellar",
//     rating: "8.7",
//     year: "2014",
//     runtime: "169 min",
//     genres: ["Sci-Fi", "Adventure", "Drama"],
//     overview:
//       "When Earth's future is threatened by crop blight and famine, a former NASA pilot leads a crew through a wormhole in search of a new home for humanity — pushing the boundaries of time, space, and love itself.",
//     chips: ["IMAX", "Dolby Atmos", "4K", "Oscar Winner"],
//     backdrop:
//       "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=90",
//   },
//   {
//     id: 1,
//     title: "The Dark Knight",
//     rating: "9.0",
//     year: "2008",
//     runtime: "152 min",
//     genres: ["Action", "Crime", "Drama"],
//     overview:
//       "When the Joker unleashes chaos on Gotham City, Batman must confront one of the greatest psychological and moral tests any hero has ever faced — all while protecting the city he loves from collapse.",
//     chips: ["IMAX", "4K", "Oscar Winner"],
//     backdrop:
//       "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=90",
//   },
//   {
//     id: 2,
//     title: "Dune: Part Two",
//     rating: "8.5",
//     year: "2024",
//     runtime: "167 min",
//     genres: ["Sci-Fi", "Adventure"],
//     overview:
//       "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between love and the fate of the known universe.",
//     chips: ["IMAX", "Dolby Atmos", "4K"],
//     backdrop:
//       "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1920&q=90",
//   },
//   {
//     id: 3,
//     title: "Oppenheimer",
//     rating: "8.3",
//     year: "2023",
//     runtime: "180 min",
//     genres: ["Biography", "Drama", "History"],
//     overview:
//       "The story of American scientist J. Robert Oppenheimer and his pivotal role in the development of the atomic bomb during the Manhattan Project — and the moral reckoning that followed.",
//     chips: ["IMAX", "Dolby Atmos", "Oscar Winner"],
//     backdrop:
//       "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=1920&q=90",
//   },
//   {
//     id: 4,
//     title: "Blade Runner 2049",
//     rating: "8.0",
//     year: "2017",
//     runtime: "164 min",
//     genres: ["Sci-Fi", "Drama", "Mystery"],
//     overview:
//       "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years. A neo-noir odyssey of identity and humanity.",
//     chips: ["IMAX", "4K", "Oscar Winner"],
//     backdrop:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=90",
//   },
//   {
//     id: 5,
//     title: "Inception",
//     rating: "8.8",
//     year: "2010",
//     runtime: "148 min",
//     genres: ["Action", "Sci-Fi", "Thriller"],
//     overview:
//       "A skilled thief who enters people's dreams to steal secrets from their subconscious is given a chance to have his criminal record erased — if he can successfully implant an idea into a target's mind.",
//     chips: ["IMAX", "Dolby Atmos", "4K"],
//     backdrop:
//       "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=90",
//   },
// ];

const INTERVAL_MS = 8000;

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function CinematicHero() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true); // content visibility for crossfade
  const timerRef = useRef(null);
  const pendingRef = useRef(null); // index to transition to
  const {
    data: { results: movies } = {},
    isPending,
    isError,
  } = useTrendyMovies();
  const movieData = movies?.slice(0, 6) || [];
  const {
    data: genres,
  } = useGenre();

  const genreList = movieData.map((movie) => {
    return movie?.genre_ids?.map((id) => genres?.[id]).filter(Boolean) ?? [];
  });

  const slides = movieData.map((movie, index) => {
    return {
      id: movie?.id,
      title: movie?.title,
      rating: movie?.vote_average,
      year: movie?.release_date?.split("-")[0],
      runtime: movie?.runtime,
      genres: genreList[index],
      overview: movie?.overview,
      backdrop: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
    };
  });

  /* ── start / restart the auto-advance timer ─────────────── */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);

    if (!slides.length) return;
    timerRef.current = setInterval(() => {
      triggerChange((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
  }, [slides.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── orchestrate fade-out → swap → fade-in ──────────────── */
  const triggerChange = (getNext) => {
    setVisible(false); // fade-out content + backdrop
    clearTimeout(pendingRef.current);
    pendingRef.current = setTimeout(() => {
      setActive((prev) => {
        const next = typeof getNext === "function" ? getNext(prev) : getNext;
        return next;
      });
      setVisible(true); // fade-in new content + backdrop
    }, 520); // matches transition duration below
  };

  /* ── manual indicator click ─────────────────────────────── */
  const goTo = (idx) => {
    setActive((prev) => {
      if (prev === idx) return prev;
      triggerChange(idx);
      return prev;
    });
    startTimer(); // restart timer from this point
  };

  /* ── auto-advance ───────────────────────────────────────── */
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(pendingRef.current);
    };
  }, [startTimer]);

  if (isPending || !slides.length) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Failed to load movies.</p>
      </section>
    );
  }

  const slide = slides[active];

  if (!slide) {
    return null;
  }

  /* ── shared transition style ─────────────────────────────── */
  const contentStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition:
      "opacity 520ms cubic-bezier(0.4, 0, 0.2, 1), transform 520ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh", minHeight: "560px" }}
      aria-label="Featured movie hero"
    >
      {/* ── Backdrop layer — all slides stacked, only active visible ── */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={s.id}
            src={s.backdrop}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: i === active ? (visible ? 1 : 0) : 0,
              transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}

        {/* Cinematic gradient: dark left → transparent right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.84) 28%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.10) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "220px",
            background:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)",
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "180px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          HERO CONTENT
      ══════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pt-24 pb-24 sm:px-8 sm:pt-28 sm:pb-20 lg:px-16"
        style={{
          height: "100%",
        }}
      >
        <div style={{ maxWidth: "min(500px, 100%)", ...contentStyle }}>
          {/* Title */}
          <h1
            className="mb-3 font-black leading-[0.96] text-white sm:mb-4"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
              letterSpacing: "-0.045em",
              textShadow: "0 4px 36px rgba(0,0,0,0.55)",
            }}
          >
            {slide.title}
          </h1>

          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-yellow-400">
                {slide.rating}
              </span>
            </span>
            <span className="text-white/25">•</span>
            <span className="text-white/65">
              {slide.genres?.join(" • ")}
            </span>
            <span className="text-white/25">•</span>
            <span className="text-white/45">{slide.year}</span>
            <span className="text-white/25">•</span>
            <span className="text-white/45">{slide.runtime}</span>
          </div>

          {/* Overview */}
          <p
            className="mb-7 text-sm leading-relaxed text-white/65 sm:mb-8 sm:text-[15px]"
            style={{
              maxWidth: "460px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              overflow: "hidden",
            }}
          >
            {slide.overview}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button
              id="hero-cta-trailer"
              className="flex items-center gap-2 rounded-lg text-xs font-bold text-white active:scale-[0.97] sm:text-[13px]"
              style={{
                padding: "11px 20px",
                background: "#e50914",
                boxShadow: "0 0 28px rgba(229,9,20,0.45)",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
            >
              <Play size={15} className="fill-white" />
              Watch Trailer
            </button>
            <button
              id="hero-cta-watchlist"
              className="flex items-center gap-2 rounded-lg text-xs font-semibold text-white/85 active:scale-[0.97] sm:text-[13px]"
              style={{
                padding: "11px 18px",
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.14)",
                transition: "background 0.2s, transform 0.15s",
              }}
            >
              <Plus size={15} />
              Add to Watchlist
            </button>
            <button
              id="hero-cta-details"
              className="flex items-center gap-2 rounded-lg text-xs font-semibold text-white/50 hover:text-white/80 active:scale-[0.97] sm:text-[13px]"
              style={{
                padding: "11px 18px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "color 0.2s, transform 0.15s",
              }}
            >
              <Info size={14} />
              More Details
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM — centered dot indicators only
      ══════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
        aria-label="Slide indicators"
      >
        <div className="flex items-center" role="tablist">
          {slides.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              onClick={() => goTo(i)}
              className="relative flex h-11 w-8 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{
                border: "none",
                padding: 0,
              }}
            >
              <span
                aria-hidden="true"
                className="block rounded-full"
                style={{
                  width: i === active ? "24px" : "6px",
                  height: "6px",
                  background: i === active ? "#e50914" : "rgba(255,255,255,0.34)",
                  transition:
                    "width 400ms cubic-bezier(0.4,0,0.2,1), background 400ms cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
