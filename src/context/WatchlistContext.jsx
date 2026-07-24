"use client";

import React, { createContext, useContext, useState } from "react";
import {
  getLocalStorageMovies,
  setLocalStorageMovies,
} from "@/utils/watchListLocalStorage";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watched, setWatched] = useState(() => getLocalStorageMovies());

  const addMovie = (movie) => {
    setWatched((prev) => {
      if (prev?.some((watch) => watch.id === movie.id)) return prev;
      const updated = [...prev, movie];
      setLocalStorageMovies(updated);
      return updated;
    });
  };

  const removeMovie = (movie) => {
    setWatched((prev) => {
      const updated = prev.filter((watch) => watch.id !== movie.id);
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
  return context;
}
