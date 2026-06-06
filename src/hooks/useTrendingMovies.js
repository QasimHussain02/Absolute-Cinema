import { getGenres, getTrendingMovies } from "@/services/tmdb";
import { genreObjectConverter } from "@/utils/genreObjectConverter";
import { useQuery } from "@tanstack/react-query";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });
}
export function useGenre() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: Infinity,
    select: (data) => genreObjectConverter(data),
  });
}
