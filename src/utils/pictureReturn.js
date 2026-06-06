export function profilePicReturn(url) {
  if (!url || url === "null") return "/profile.png";
  return `https://image.tmdb.org/t/p/w500${url}`;
}

export function moviePicReturn(url) {
  if (!url || url === "null") return "/film-icon.webp";
  return `https://image.tmdb.org/t/p/w500${url}`;
}
