import { getSearchMovie } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useSearchResults(debouncedQuery) {
  return useQuery({
    queryKey: ["searchSuggestion", debouncedQuery],
    queryFn: () => getSearchMovie(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.length > 2,
  });
}
