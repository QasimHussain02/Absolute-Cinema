"use client";

import React, { createContext, useContext, useState } from "react";
import {
  getLocalStorageMovies,
  setLocalStorageMovies,
} from "@/utils/watchListLocalStorage";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watched, setWatched] = useState(() => {
    const initial = getLocalStorageMovies();
    console.log("🎬 WatchlistProvider INITIALIZED with:", initial);
    return initial;
  });

  const addMovie = (movie) => {
    console.log("➕ addMovie called with:", movie.id, movie.title);
    setWatched((prev) => {
      console.log("📊 addMovie state callback - prev:", prev);
      if (prev?.some((watch) => watch.id === movie.id)) {
        console.log("⚠️ Movie already exists, returning prev");
        return prev;
      }

      const updated = [...prev, movie];
      console.log("📝 Updated array before localStorage:", updated);
      setLocalStorageMovies(updated);
      return updated;
    });
  };

  const removeMovie = (movie) => {
    console.log("➖ removeMovie called with:", movie.id, movie.title);
    setWatched((prev) => {
      const updated = prev.filter((watch) => watch.id !== movie.id);
      console.log("📝 Updated array after removal:", updated);
      setLocalStorageMovies(updated);
      return updated;
    });
  };

  const isAlreadyExists = (movie) => {
    return watched.some((watch) => watch.id === movie.id);
  };

  return (
    <WatchlistContext.Provider
      value={{ addMovie, removeMovie, isAlreadyExists, watched }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchList() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchList must be used within WatchlistProvider");
  }
  console.log("🪝 useWatchList hook called - returning context");
  return context;
}
