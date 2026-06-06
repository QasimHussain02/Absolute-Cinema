"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { moviePicReturn, profileReturn } from "@/utils/pictureReturn";

export default function SimilarMovies({ movies }) {
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
          {movies.map((movie) => {
            return (
              <button
                key={movie.id}
                className="flex-none w-44 sm:w-48 text-left snap-start group cursor-pointer focus:outline-none"
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-[#1c1c1c] aspect-[2/3] mb-3 border transition-all duration-300 ${"border-transparent group-hover:border-zinc-800"}`}
                >
                  <img
                    src={moviePicReturn(movie.poster_path)}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                  />
                  {/* Dark gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                    <span className="text-[10px] text-zinc-300 font-mono">
                      {movie.duration || "Details"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
                    <button className="w-full py-2 bg-primary-container text-white rounded-lg text-xs mb-2 hover:bg-primary-container/90 transition-colors">
                      Watch Trailer
                    </button>

                    <button className="w-full py-2 bg-transparent border border-white/20 text-white rounded-lg text-xs hover:bg-white/10 transition-colors">
                      Add to List
                    </button>
                  </div>
                </div>

                <div className="px-1">
                  <h4
                    className={`text-sm font-semibold truncate transition-colors duration-300 ${"text-white group-hover:text-zinc-300"}`}
                  >
                    {movie.title}
                  </h4>
                  <div className="flex items-center text-xs text-zinc-400 mt-1 gap-2">
                    <span>{movie.release_date.split("-")[0]}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />{" "}
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
