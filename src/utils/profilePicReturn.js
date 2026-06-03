export function profileReturn(url) {
  if (!url || url === "null") return "/profile.png";
  return `https://image.tmdb.org/t/p/w500${url}`;
}
