"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function SimilarMovies({ movies, id }) {
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative w-full bg-[#111111]/40 border-t border-zinc-900 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div className="text-left">
            <h2 className="text-xs tracking-widest uppercase font-bold text-[#d89088] mb-2">
              Recommendations
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Similar Movies
            </h3>
          </div>

          {/* Carousel Navigation Buttons
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 bg-[#1c1c1c] border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-md focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 bg-[#1c1c1c] border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-md focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>

        {/* Horizontal Scrolling Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-6 scrollbar-none snap-x select-none cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-44 sm:w-48 snap-start"
            >
              <MovieCard
                movie={movie}
                showTrailerModal={true}
                showGenre={false}
                ratingStyle="star"
                size="compact"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
