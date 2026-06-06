const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export async function getTrendingMovies() {
  const data = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const { results } = await data.json();
  return results;
}
export async function getGenres() {
  const data = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const { genres } = await data.json();
  // console.log(genres);

  return genres;
}

export async function getMovieDetails(id) {
  const data = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const movie = await data.json();
  return movie;
}

export async function getCast(id) {
  const data = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
  );
  const casts = await data.json();
  return casts;
}

export async function getSimilarMovies(id) {
  const data = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`,
  );
  const { results } = await data.json();
  // console.log(results);

  return results;
}
