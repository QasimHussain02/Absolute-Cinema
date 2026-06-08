import { getMovieTrailer } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useTrailer(id) {
  return useQuery({
    queryKey: ["trailerMovie", id],
    queryFn: () => getMovieTrailer(id),
    staleTime: Infinity,
  });
}
