import MovieDetailClient from "@/components/movie/MovieDetailClient";
import { useSimilarMovies } from "@/hooks/useSimilarMovies";
import { getCast, getMovieDetails, getSimilarMovies } from "@/services/tmdb";

const Page = async ({ params }) => {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return <MovieDetailClient id={id} movie={movie} />;
};

export default Page;
