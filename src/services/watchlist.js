import { toast } from "sonner";

export function addToWatchlist(e, movie, inList, addMovie, removeMovie, title) {
  e.stopPropagation();
  e.preventDefault();
  if (inList) {
    removeMovie(movie);
    toast.success(`"${title}" removed from your list`);
  } else {
    addMovie(movie);
    toast.success(`"${title}" added to your list`);
  }
}

export function handleRemove(e, movie, removeMovie, title) {
  e.stopPropagation();
  e.preventDefault();
  removeMovie(movie);
  toast.success(`"${title}" removed from your list`);
}
