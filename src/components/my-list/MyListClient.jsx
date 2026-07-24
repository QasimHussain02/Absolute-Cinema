"use client";

import React from "react";
import { useWatchList } from "@/hooks/useWatchlist";
import Link from "next/link";
import { Film } from "lucide-react";
import MovieCard from "@/components/movie/MovieCard";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      {/* Glow orb behind icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-3xl scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-surface-container border border-white/5 flex items-center justify-center">
          <Film size={40} className="text-primary-container" />
        </div>
      </div>

      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">
        Your list is empty
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">
        Start adding movies you want to watch later. Hover over any movie card
        and hit&nbsp;<strong className="text-primary">Add to List</strong>.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary-container text-white font-label-caps text-label-caps px-6 py-3 rounded-full hover:bg-primary-container/80 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[18px]">explore</span>
        Discover Movies
      </Link>
    </div>
  );
}

export default function MyListClient() {
  const { watched } = useWatchList();

  return (
    <main className="pt-[100px] md:pt-[120px] pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-headline-xl text-headline-xl text-on-surface">
            My List
          </h1>
          {watched.length > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-primary-container text-white font-label-caps text-label-caps">
              {watched.length}
            </span>
          )}
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {watched.length > 0
            ? "Your personal collection of must-watch films."
            : "Films you save will appear here."}
        </p>
        {/* Red accent rule */}
        <div className="mt-4 h-px w-16 bg-primary-container rounded-full" />
      </div>

      {watched.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watched.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              watchlistMode={true}
              showTrailerModal={false}
            />
          ))}
        </div>
      )}
    </main>
  );
}
