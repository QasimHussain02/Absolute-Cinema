export function genreObjectConverter(arr) {
  return Object.fromEntries(arr.map((g) => [g.id, g.name]));
}
