/* eslint-disable @next/next/no-img-element */
"use client";

import { useCast } from "@/hooks/useCast";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { getCast } from "@/services/tmdb";
import { profileReturn } from "@/utils/profilePicReturn";
import { formatRuntime } from "@/utils/runtimeConverter";

const MovieDetailClient = ({ id, movie }) => {
  const {
    data: movieDetails,
    error: movieDetailsError,
    isPending: movieDetailsLoading,
  } = useMovieDetails(id, movie);
  const { data: casts, error: castError, isPending: castLoading } = useCast(id);
  const cast = casts?.cast;
  console.log(cast);

  const poster_paths = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const backdrop_paths = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const heroMeta = [
    movieDetails.vote_average,
    movieDetails.release_date.split("-")[0],
    formatRuntime(movieDetails.runtime),
  ];
  const quickInfo = [
    { label: "Release Date", value: movieDetails.release_date },
    // { label: "Language", value: movie.language },
    { label: "Runtime", value: formatRuntime(movieDetails.runtime) },
    { label: "Status", value: movieDetails.status },
    {
      label: "Rating",
      value: `${movieDetails.vote_average} / 10 · ${movieDetails.vote_count}`,
    },
  ];

  if (movieDetailsLoading || castLoading) return <div>loading...</div>;
  if (movieDetailsError || castError)
    return (
      <div>
        An error occured, Please try again or Check your internet connection
      </div>
    );
  return (
    <div className="bg-background text-on-background">
      <section className="relative isolate flex min-h-[300px] items-end overflow-hidden pt-24 md:min-h-[500px] md:pt-28">
        <div className="absolute inset-0">
          <img
            src={backdrop_paths}
            alt="Neon-lit futuristic city street at night"
            className="h-full w-full scale-105 object-cover object-center opacity-100"
          />
          {/* Subtle color glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,173,181,0.2),transparent_80%),radial-gradient(circle_at_top_right,rgba(229,9,20,0.15),transparent_30%)]" />

          {/* Vertical Gradient - Lightened the 'via' and 'to' sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#090909]/50 to-transparent" />

          {/* Horizontal Gradient - Lightened the side-fade to show more of the right side */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-container-max flex-col gap-10 px-margin-mobile pb-14 md:px-margin-desktop md:pb-20 lg:flex-row lg:items-end lg:gap-12">
          <div className="w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-surface-container-low shadow-[0_24px_80px_rgba(0,0,0,0.65)] md:w-56 lg:translate-y-8">
            <img
              src={poster_paths}
              alt={`${movieDetails.title} poster`}
              className="aspect-[2/3] h-full w-full object-cover"
            />
          </div>

          <div className="max-w-4xl flex-1">
            <div className="mb-5 flex flex-wrap gap-2.5 text-label-caps uppercase tracking-[0.18em] text-surface-tint/90">
              {heroMeta.map((item) => (
                <span
                  key={item}
                  className="badge-glass rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-on-background/88"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <h1 className="max-w-3xl font-display-lg-mobile text-display-lg-mobile text-white md:font-display-lg md:text-display-lg">
                {movieDetails.title}
              </h1>
              <p className="max-w-2xl font-headline-md text-headline-md text-on-surface-variant/90">
                {movieDetails.tagline}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary-container px-6 py-3 font-metadata text-metadata font-semibold text-on-primary-container transition-transform duration-300 hover:scale-[1.02] hover:bg-[#f31a25]">
                Add to Watchlist
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 font-metadata text-metadata text-white/92 backdrop-blur-xl transition-colors duration-300 hover:bg-white/12">
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-container-max flex-col gap-14 px-margin-mobile py-14 md:px-margin-desktop md:gap-20 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-label-caps text-label-caps uppercase tracking-[0.28em] text-primary/70">
                Overview
              </p>
            </div>
            <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant/88">
              {movieDetails.overview}
            </p>
          </div>

          <aside className="glass-panel rounded-[28px] border border-white/6 p-5 md:p-6">
            <p className="mb-4 font-label-caps text-label-caps uppercase tracking-[0.24em] text-primary/70">
              Quick Info
            </p>
            <div className="flex flex-wrap gap-3 lg:hidden">
              {quickInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/8 bg-white/4 px-4 py-2 text-sm text-on-background/92"
                >
                  <span className="mr-2 text-on-surface-variant/70">
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="hidden lg:block">
              {quickInfo.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between gap-6 py-4 ${
                    index !== quickInfo.length - 1
                      ? "border-b border-white/8"
                      : ""
                  }`}
                >
                  <span className="font-metadata text-metadata text-on-surface-variant/72">
                    {item.label}
                  </span>
                  <span className="text-right font-body-md text-body-md text-on-background">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-label-caps text-label-caps uppercase tracking-[0.28em] text-primary/70">
                Cast
              </p>
              <h2 className="mt-2 font-headline-xl text-headline-xl text-white">
                Top Cast
              </h2>
            </div>
          </div>

          <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-3 md:gap-5">
            {cast.map((person) => (
              <article
                key={person.name}
                className="group min-w-[170px] max-w-[170px] snap-start overflow-hidden rounded-[20px] border border-white/7 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:border-white/14 hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
              >
                <div className="relative aspect-[0.78] overflow-hidden">
                  <img
                    src={profileReturn(person.profile_path)}
                    alt={`${person.name} portrait`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent opacity-70" />
                </div>
                <div className="space-y-1.5 p-4">
                  <h3 className="font-metadata text-metadata font-semibold text-white">
                    {person.name}
                  </h3>
                  <p className="text-sm leading-6 text-on-surface-variant/72">
                    {person.character}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MovieDetailClient;
