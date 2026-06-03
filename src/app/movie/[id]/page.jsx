import MovieDetailClient from "@/components/movie/MovieDetailClient";
import { getCast, getMovieDetails } from "@/services/tmdb";

const Page = async ({ params }) => {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return <MovieDetailClient id={id} movie={movie} />;
};

export default Page;
