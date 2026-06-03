import React from "react";

export default function TrendingHero() {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
          Trending Now
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          The most anticipated releases and critically acclaimed masterpieces
          currently captivating audiences worldwide.
        </p>
      </div>
      {/* <div className="hidden md:flex gap-2">
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary transition-colors">
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">view_list</span>
        </button>
      </div> */}
    </div>
  );
}
