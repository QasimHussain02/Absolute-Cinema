import React from "react";

const MovieHero = ({
  backdrop_paths,
  movieDetails,
  poster_paths,
  heroMeta,
}) => {
  return (
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
            {heroMeta.map((item, idx) => (
              <span
                key={item}
                className="badge-glass rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-on-background/88"
              >
                {item} {idx == 0 ? " ratings" : ""}
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
  );
};

export default MovieHero;
