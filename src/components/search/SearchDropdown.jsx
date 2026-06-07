"use client";
import { moviePicReturn } from "@/utils/pictureReturn";
import Link from "next/link";
import React from "react";

// ── Mock suggestions (UI-only, no backend) ─────────────────────────────────
const SUGGESTIONS = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi · Thriller",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=72&h=104&fit=crop&crop=entropy&auto=format",
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi · Drama",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=72&h=104&fit=crop&crop=entropy&auto=format",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action · Crime",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=72&h=104&fit=crop&crop=entropy&auto=format",
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Sci-Fi · Neo-Noir",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=72&h=104&fit=crop&crop=entropy&auto=format",
  },
  {
    id: 5,
    title: "Dune",
    year: 2021,
    genre: "Sci-Fi · Epic",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=72&h=104&fit=crop&crop=entropy&auto=format",
  },
];

/**
 * SearchDropdown
 *
 * Pure UI component — no absolute positioning of its own.
 * The parent is responsible for wrapping this in a positioned container.
 *
 * Props:
 *  isOpen   – whether to show the panel
 */
export default function SearchDropdown({
  isOpen,
  filteredMovies,
  isPending,
  isError,
}) {
  return (
    <div
      role="listbox"
      aria-label="Search suggestions"
      className={`w-full rounded-2xl overflow-hidden
                  border border-white/[0.07]
                  bg-[#080808]/95 backdrop-blur-2xl
                  shadow-[0_24px_64px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.025)]
                  transition-all duration-300 ease-out
                  ${
                    isOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-3 scale-[0.96] pointer-events-none"
                  }`}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-on-surface-variant/45">
          Popular
        </span>
        <span className="text-[10px] text-on-surface-variant/25">5 titles</span>
      </div>

      {/* Hairline divider */}
      <div className="mx-4 h-px bg-white/[0.05]" />

      {/* ── Suggestion list ── */}
      <ul className="py-1.5">
        {filteredMovies?.map((movie) => (
          <li key={movie.id} role="option" aria-selected="false">
            <Link
              href={`/movie/${movie.id}`}
              type="button"
              className="
                w-full flex items-center gap-3 px-3.5 py-2.5
                relative overflow-hidden group cursor-pointer text-left
                hover:bg-white/[0.055] active:bg-white/[0.09]
                transition-colors duration-150
                focus:outline-none focus-visible:bg-white/[0.055]
              "
            >
              {/* Left accent bar — grows from bottom on hover */}
              <span
                className="
                  absolute left-0 inset-y-[5px] w-[2px] rounded-full
                  bg-gradient-to-b from-secondary via-primary to-secondary/30
                  scale-y-0 group-hover:scale-y-100
                  transition-transform duration-250 ease-out origin-bottom
                "
              />

              {/* Subtle glow behind the row on hover */}
              <span
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-r from-secondary/[0.04] to-transparent
                  transition-opacity duration-200
                "
              />

              {/* Poster thumbnail */}
              <div
                className="
                  relative w-9 h-[52px] rounded-lg overflow-hidden shrink-0
                  border border-white/[0.09] shadow-lg shadow-black/50
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={moviePicReturn(movie.poster_path, 92)}
                  alt={movie.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                />
                {/* Shimmer overlay */}
                <span className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/5" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 relative">
                <p
                  className="
                    text-[13px] font-medium leading-tight truncate
                    text-on-surface group-hover:text-primary
                    transition-colors duration-150
                  "
                >
                  {movie.title}
                </p>
                <p className="text-[11px] text-on-surface-variant/50 mt-0.5 leading-none">
                  {movie.release_date.split("-")[0]}
                </p>
                <p className="text-[10px] text-on-surface-variant/30 mt-1 leading-none tracking-wide">
                  {/* {movie.genre} */}
                </p>
              </div>

              {/* Arrow hint — slides in from right on hover */}
              <span
                className="
                  relative text-xs shrink-0
                  text-on-surface-variant
                  opacity-0 group-hover:opacity-40
                  translate-x-2 group-hover:translate-x-0
                  transition-all duration-200 ease-out
                "
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Footer CTA ── */}
      <div className="border-t border-white/[0.05] px-4 py-2.5">
        <button
          type="button"
          className="
            w-full text-center text-[11px] font-medium tracking-wide
            text-secondary/55 hover:text-secondary
            transition-colors duration-200
          "
        >
          Browse all movies →
        </button>
      </div>
    </div>
  );
}
