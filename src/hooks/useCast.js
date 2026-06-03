import { getCast } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useCast(id) {
  return useQuery({
    queryKey: ["casts", id],
    queryFn: () => getCast(id),
    staleTime: Infinity,
    enabled: !!id,
  });
}
