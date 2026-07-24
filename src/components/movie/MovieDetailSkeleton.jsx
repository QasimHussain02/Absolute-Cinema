const Shimmer = ({ className = "", style = {} }) => (
  <div
    className={`rounded-lg ${className}`}
    style={{
      backgroundImage:
        "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.6s infinite",
      ...style,
    }}
  />
);

const MovieDetailSkeleton = () => {
  return (
    <div className="bg-background text-on-background relative">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Hero Skeleton ── */}
      <section className="relative isolate flex min-h-[300px] items-end overflow-hidden pt-24 md:min-h-[500px] md:pt-28">
        {/* Backdrop placeholder */}
        <div className="absolute inset-0 bg-surface-container-low">
          <Shimmer className="h-full w-full rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#090909]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-container-max flex-col gap-10 px-margin-mobile pb-14 md:px-margin-desktop md:pb-20 lg:flex-row lg:items-end lg:gap-12">
          {/* Poster */}
          <Shimmer className="h-[216px] w-36 shrink-0 rounded-2xl md:h-[336px] md:w-56 lg:translate-y-8" />

          <div className="max-w-4xl flex-1 space-y-5">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2.5">
              {[60, 48, 80].map((w, i) => (
                <Shimmer key={i} className="h-7 rounded-full" style={{ width: `${w}px` }} />
              ))}
            </div>

            {/* Title */}
            <Shimmer className="h-10 w-3/4 rounded-xl md:h-14" />
            {/* Tagline */}
            <Shimmer className="h-5 w-1/2 rounded-lg" />

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Shimmer className="h-11 w-36 rounded-full" />
              <Shimmer className="h-11 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Skeleton ── */}
      <main className="mx-auto flex w-full max-w-container-max flex-col gap-14 px-margin-mobile py-14 md:px-margin-desktop md:gap-20 md:py-20">

        {/* Overview Section */}
        <section className="flex flex-col gap-6 lg:flex-row lg:gap-16">
          {/* Overview text */}
          <div className="flex-1 space-y-4">
            <Shimmer className="h-7 w-32 rounded-lg" />
            <Shimmer className="h-4 w-full rounded" />
            <Shimmer className="h-4 w-full rounded" />
            <Shimmer className="h-4 w-5/6 rounded" />
            <Shimmer className="h-4 w-4/6 rounded" />
          </div>

          {/* Quick Info panel */}
          <div className="w-full space-y-3 rounded-2xl border border-white/8 p-6 lg:w-72" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <Shimmer className="h-4 w-24 rounded" />
                <Shimmer className="h-4 w-28 rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Cast Section */}
        <section className="space-y-6">
          <Shimmer className="h-7 w-24 rounded-lg" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex shrink-0 flex-col items-center gap-2">
                <Shimmer className="h-20 w-20 rounded-full" />
                <Shimmer className="h-3 w-16 rounded" />
                <Shimmer className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Similar Movies Section */}
        <section className="space-y-6">
          <Shimmer className="h-7 w-36 rounded-lg" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Shimmer className="aspect-[2/3] w-full rounded-xl" />
                <Shimmer className="h-4 w-3/4 rounded" />
                <Shimmer className="h-3 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MovieDetailSkeleton;
