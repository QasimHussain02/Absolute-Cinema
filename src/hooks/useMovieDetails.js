import { getMovieDetails } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useMovieDetails(id, movie) {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
    initialData: movie,
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
