import { useQuery } from "@tanstack/react-query";
import { getTrendyMovies } from "../services/tmdb";

export function useTrendyMovies() {
  return useQuery({
    queryKey: ["Trending hero"],
    queryFn: getTrendyMovies,
    staleTime: 1000 * 60 * 5,
  });
}
