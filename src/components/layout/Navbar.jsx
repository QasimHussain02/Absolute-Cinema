"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import SearchDropdown from "@/components/search/SearchDropdown";
import { useSearchResults } from "@/hooks/useSearchResult";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  function scoreMovie(obj, searchInput) {
    const movie = obj.title?.toLowerCase();
    const searchKeyword = searchInput?.toLowerCase();
    let score = 0;
    if (movie === searchKeyword) score += 100;
    else if (movie.startsWith(searchKeyword)) score += 10;
    else if (movie.includes(searchKeyword)) score += 5;
    score += obj.vote_average * 2;
    score += obj.popularity;
    return score;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: movieSearchResults,
    error: searchError,
    isPending: searchLoading,
  } = useSearchResults(debouncedInput);
  const filteredMovies = movieSearchResults
    ?.map((obj) => ({
      ...obj,
      score: scoreMovie(obj, searchInput),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Desktop dropdown: controlled by input focus/blur
  const desktopBlurTimer = useRef(null);

  // Refs for outside-click on mobile search
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);
  useEffect(() => {
    if (filteredMovies?.length > 0 && searchInput.length > 2) {
      setDesktopDropdownOpen(true);
      setMobileDropdownOpen(true);
    } else {
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
    }
  }, [filteredMovies, searchInput]);
  // ── Close mobile search on outside click ──────────────────────────────────
  useEffect(() => {
    if (!mobileSearchOpen) return;
    const handleClickOutside = (e) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileSearchOpen]);

  // ── Auto-focus mobile input when overlay opens ────────────────────────────
  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      const t = setTimeout(() => mobileInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [mobileSearchOpen]);

  // ── Cleanup blur timer on unmount ─────────────────────────────────────────
  useEffect(() => () => clearTimeout(desktopBlurTimer.current), []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          Desktop Navbar
      ══════════════════════════════════════════════════════ */}
      <nav className="hidden md:flex bg-surface/80 backdrop-blur-xl text-primary font-body-md text-body-md fixed top-0 w-full z-50 shadow-2xl shadow-primary/10 border-b border-white/5">
        <div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
          {/* Left: Logo + Nav links */}
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="font-headline-md text-headline-md font-bold text-primary-container"
            >
              Absolute Cinema
            </Link>
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/"
                  className="text-primary border-b-2 border-primary pb-1 font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300"
                >
                  My List
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Search + Actions */}
          <div className="flex items-center gap-6">
            {/* ── Desktop search + dropdown ── */}
            <div className="relative group">
              <input
                id="desktop-search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                autoComplete="off"
                name="search"
                placeholder="Search..."
                onBlur={() => {
                  desktopBlurTimer.current = setTimeout(
                    () => setDesktopDropdownOpen(false),
                    200,
                  );
                }}
                className="bg-[#050505] text-on-surface border border-white/10 rounded-full py-2 pl-4 pr-10
                           focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30
                           transition-all duration-300 font-body-md text-body-md w-64
                           placeholder:text-on-surface-variant/50"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant
                           group-focus-within:text-secondary transition-colors duration-300 pointer-events-none"
              />

              {/* Dropdown — prevent blur when clicking inside */}
              <div
                className="absolute top-full left-0 right-0 mt-2.5 z-[200]"
                onMouseDown={(e) => e.preventDefault()}
              >
                <SearchDropdown
                  isOpen={desktopDropdownOpen}
                  setIsOpen={setDesktopDropdownOpen}
                  filteredMovies={filteredMovies}
                  isPending={searchLoading}
                  isError={searchError}
                  searchInput={searchInput}
                />
              </div>
            </div>

            <button className="text-on-surface-variant hover:text-primary transition-colors active:scale-95">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                notifications
              </span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXsQtpdF3LP1F6Bmn4bCSfgMKirToba4kZSTIqkw3HtGX6EwlnEa2jlZh0PPXegQP2EYDJ-oc11DYwaDLCSpN20vfdibPCXQZWQaHml3bXL51s0cQYcFazGVdg9yg90BWOP4_HG-oY1n7vGNOE12zrlta91Qpx-fbNL7lst8jqiU9wgFCT7y6P-pdILu46aNdIQMPmwdCXGIvKnXnCKo7gHbVR1C5kmTezfd7cb4DxPejnDGKVUIeQqY5ShvAEaa-3n0mbI96REea4"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          Mobile Header
          Structure:
            <header>  ← fixed, acts as stacking context
              <div.relative.h-16>  ← base bar + search overlay
                <div.absolute.top-full>  ← dropdown, below the bar
      ══════════════════════════════════════════════════════ */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
        {/* Inner bar — relative so the overlay + dropdown are positioned against it */}
        <div
          ref={mobileSearchRef}
          className="relative flex items-center justify-between px-4 h-16"
        >
          {/* ── Menu button ── */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className={`text-on-surface p-1 z-10 transition-opacity duration-200
                        ${mobileSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Open navigation"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* ── Logo ── */}
          <span
            className={`font-headline-md text-headline-md font-bold text-primary-container select-none
                        transition-opacity duration-200
                        ${mobileSearchOpen ? "opacity-0" : "opacity-100"}`}
          >
            Absolute Cinema
          </span>

          {/* ── Search icon (collapsed state) — anchor the overlay expands from ── */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className={`text-on-surface-variant hover:text-primary p-1 z-10
                        transition-all duration-200
                        ${mobileSearchOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"}`}
            aria-label="Open search"
          >
            <Search size={22} />
          </button>

          {/* ── Search overlay: expands right → left via scaleX + origin-right ── */}
          <div
            aria-hidden={!mobileSearchOpen}
            style={{
              transformOrigin: "right center",
              transitionProperty: "transform, opacity",
              transitionDuration: mobileSearchOpen ? "320ms" : "240ms",
              transitionTimingFunction: mobileSearchOpen
                ? "cubic-bezier(0.22,1,0.36,1)"
                : "cubic-bezier(0.4,0,1,1)",
            }}
            className={`absolute inset-0 flex items-center px-4 gap-3
                        bg-surface/98 backdrop-blur-xl
                        ${
                          mobileSearchOpen
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 pointer-events-none"
                        }`}
          >
            {/* Search icon inside overlay */}
            <Search
              size={18}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "200ms",
                transitionDelay: mobileSearchOpen ? "160ms" : "0ms",
              }}
              className={`text-secondary shrink-0
                          ${mobileSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
            />

            {/* Input */}
            <input
              id="mobile-search-input"
              ref={mobileInputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Search movies, shows…"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "200ms",
                transitionDelay: mobileSearchOpen ? "180ms" : "0ms",
              }}
              className={`flex-1 bg-transparent text-on-surface
                          border-b border-white/15 focus:border-secondary focus:outline-none
                          font-body-md text-body-md py-1
                          placeholder:text-on-surface-variant/40 caret-secondary
                          ${mobileSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            />

            {/* X close */}
            <button
              onClick={() => {
                setMobileSearchOpen(false);
                setMobileDropdownOpen(false);
                setSearchInput("");
              }}
              aria-label="Close search"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "180ms",
                transitionDelay: mobileSearchOpen ? "200ms" : "0ms",
              }}
              className={`text-on-surface-variant hover:text-primary shrink-0 p-1
                          ${mobileSearchOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Mobile suggestions dropdown — anchored below the bar ── */}
          <div
            className="absolute top-full left-4 right-4 mt-2 z-[100]"
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchDropdown
              isOpen={mobileDropdownOpen}
              setIsOpen={setMobileDropdownOpen}
              filteredMovies={filteredMovies}
              searchInput={searchInput}
              isPending={searchLoading}
              isError={searchError}
            />
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          Mobile Nav Drawer
      ══════════════════════════════════════════════════════ */}
      <nav
        className={`md:hidden flex flex-col py-8 bg-surface text-primary font-label-caps text-label-caps
                    fixed left-0 top-0 h-full w-64 z-[60] border-r border-white/5 shadow-xl
                    transition-transform duration-300
                    ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-4 mb-8 flex justify-between items-center">
          <div>
            <div className="font-headline-xl text-headline-xl text-primary-container">
              Absolute Cinema
            </div>
            <div className="text-on-surface-variant font-metadata text-metadata mt-1">
              Premium Theater
            </div>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="text-on-surface-variant p-2"
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 bg-primary-container/10 text-primary border-r-4 border-primary p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined">home</span>Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined">trending_up</span>
                Trending
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined">new_releases</span>
                New Releases
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined">star</span>Top Rated
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                Upcoming
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 mt-auto">
          <button className="w-full py-3 bg-primary-container text-white rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity">
            Upgrade to Pro
          </button>
        </div>
      </nav>

      {/* Drawer scrim */}
      {mobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
