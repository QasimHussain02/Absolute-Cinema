import { useWatchList as useWatchListContext } from "@/context/WatchlistContext";

// This hook is now a wrapper around the Context-based implementation
// for backwards compatibility
export function useWatchList() {
  return useWatchListContext();
}
