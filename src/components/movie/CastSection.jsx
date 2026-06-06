import { profilePicReturn } from "@/utils/pictureReturn";
import React from "react";

const CastSection = ({ cast }) => {
  return (
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
                src={profilePicReturn(person.profile_path)}
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
  );
};

export default CastSection;
