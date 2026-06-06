import { getSimilarMovies } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useSimilarMovies(id) {
  return useQuery({
    queryKey: ["similarMovie", id],
    queryFn: () => getSimilarMovies(id),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
