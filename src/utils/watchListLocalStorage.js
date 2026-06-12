const KEY = "watchList";

export const getLocalStorageMovies = () => {
  if (typeof window === "undefined") return [];
  const movies = localStorage.getItem(KEY);
  return movies ? JSON.parse(movies) : [];
};

export const setLocalStorageMovies = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};
