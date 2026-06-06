import React from "react";

const MovieOverviewSection = ({ movieDetails, quickInfo }) => {
  return (
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
                index !== quickInfo.length - 1 ? "border-b border-white/8" : ""
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
  );
};

export default MovieOverviewSection;
