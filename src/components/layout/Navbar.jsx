"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Menu, X } from "lucide-react";
import SearchDropdown from "@/components/search/SearchDropdown";
import { useSearchResults } from "@/hooks/useSearchResult";
import { useWatchList } from "@/hooks/useWatchlist";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/" },
  { label: "TV Shows", href: "/" },
  { label: "My List", href: "/my-list" },
  { label: "AI Guide", href: "/" },
];

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

export default function Navbar() {
  const pathname = usePathname();
  const { watched } = useWatchList();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: movieSearchResults,
    error: searchError,
    isPending: searchLoading,
  } = useSearchResults(debouncedInput);

  const filteredMovies = movieSearchResults
    ?.map((obj) => ({ ...obj, score: scoreMovie(obj, searchInput) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  useEffect(() => {
    if (filteredMovies?.length > 0 && searchInput.length > 2) {
      setDesktopDropdownOpen(true);
      setMobileDropdownOpen(true);
    } else {
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
    }
  }, [filteredMovies, searchInput]);

  const desktopBlurTimer = useRef(null);
  const desktopInputRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);

  useEffect(() => {
    if (!mobileSearchOpen) return;
    const handleClickOutside = (e) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setMobileSearchOpen(false);
        setSearchInput("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      const t = setTimeout(() => mobileInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (desktopSearchOpen && desktopInputRef.current) {
      const t = setTimeout(() => desktopInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [desktopSearchOpen]);

  useEffect(() => () => clearTimeout(desktopBlurTimer.current), []);

  const isActive = (link) => {
    if (link.href === "/my-list") return pathname.startsWith("/my-list");
    if (link.href === "/" && link.label === "Home") return pathname === "/";
    return false;
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP NAVBAR (lg+)
      ══════════════════════════════════════════ */}
      <header
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: "0 clamp(16px, 4vw, 56px)",
          background: scrolled ? "rgba(0,0,0,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{ height: "76px", maxWidth: "1440px" }}
        >
          {/* Logo + Nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Absolute Cinema Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Absolute Cinema"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <nav className="flex items-center gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13px] font-semibold tracking-wide transition-colors duration-200"
                    style={{
                      color: active ? "#fff" : "rgba(255,255,255,0.55)",
                      borderBottom: active ? "1.5px solid #e50914" : "none",
                      paddingBottom: active ? "2px" : "0",
                    }}
                  >
                    {link.label === "My List" && watched.length > 0 ? (
                      <span className="flex items-center gap-1.5">
                        {link.label}
                        <span
                          className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full text-white"
                          style={{ fontSize: "9px", background: "#e50914" }}
                        >
                          {watched.length}
                        </span>
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            {/* Desktop search — icon expanding into inline input */}
            <div className="relative flex items-center">
              <div
                style={{
                  transformOrigin: "right center",
                  transition: desktopSearchOpen
                    ? "width 320ms cubic-bezier(0.22,1,0.36,1), opacity 250ms ease"
                    : "width 240ms cubic-bezier(0.4,0,1,1), opacity 200ms ease",
                  width: desktopSearchOpen ? "220px" : "0px",
                  opacity: desktopSearchOpen ? 1 : 0,
                  pointerEvents: desktopSearchOpen ? "auto" : "none",
                  overflow: "hidden",
                }}
              >
                <input
                  id="desktop-search-input"
                  ref={desktopInputRef}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  autoComplete="off"
                  placeholder="Search movies, shows..."
                  onBlur={() => {
                    desktopBlurTimer.current = setTimeout(() => {
                      setDesktopDropdownOpen(false);
                      if (!searchInput) setDesktopSearchOpen(false);
                    }, 200);
                  }}
                  className="w-full bg-transparent text-white text-[13px] font-medium
                             border-b border-white/30 focus:border-[#e50914] focus:outline-none
                             py-1 pr-2 placeholder:text-white/35 caret-[#e50914]
                             transition-colors duration-200"
                />
              </div>

              <button
                id="navbar-search-btn"
                aria-label="Search"
                onClick={() => {
                  if (desktopSearchOpen && searchInput) {
                    setSearchInput("");
                    setDesktopDropdownOpen(false);
                  } else if (desktopSearchOpen) {
                    setDesktopSearchOpen(false);
                  } else {
                    setDesktopSearchOpen(true);
                  }
                }}
                className="flex text-white/60 hover:text-white transition-colors duration-200 shrink-0 ml-1"
              >
                {desktopSearchOpen ? <X size={18} /> : <Search size={19} />}
              </button>

              {desktopSearchOpen && (
                <div
                  className="absolute top-full right-0 mt-3 z-[200]"
                  style={{ width: "280px" }}
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
              )}
            </div>

            {/* Watchlist link */}
            <Link href="/my-list">
              <button
                id="navbar-watchlist-btn"
                aria-label="Watchlist"
                className="hidden xl:flex items-center gap-1.5 text-[13px] font-medium text-white/60 hover:text-white transition-colors"
              >
                <Bookmark size={17} />
                Watchlist
              </button>
            </Link>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 cursor-pointer shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MOBILE HEADER (< lg)
      ══════════════════════════════════════════ */}
      <header
        className="lg:hidden fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div
          ref={mobileSearchRef}
          className="relative flex items-center justify-between px-4 h-16"
        >
          {/* Menu button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className={`text-white/70 hover:text-white p-1 z-10 transition-all duration-200
                        ${mobileSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className={`transition-opacity duration-200 ${mobileSearchOpen ? "opacity-0" : "opacity-100"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Absolute Cinema"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Search icon (collapsed) */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className={`text-white/60 hover:text-white p-1 z-10
                        transition-all duration-200
                        ${mobileSearchOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"}`}
            aria-label="Open search"
          >
            <Search size={21} />
          </button>

          {/* Search overlay */}
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
                        bg-black/90 backdrop-blur-xl
                        ${mobileSearchOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 pointer-events-none"}`}
          >
            <Search
              size={17}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "200ms",
                transitionDelay: mobileSearchOpen ? "160ms" : "0ms",
              }}
              className={`shrink-0 transition-all
                          ${mobileSearchOpen ? "opacity-100 translate-x-0 text-[#e50914]" : "opacity-0 translate-x-3 text-white/60"}`}
            />

            <input
              id="mobile-search-input"
              ref={mobileInputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Search movies, shows..."
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "200ms",
                transitionDelay: mobileSearchOpen ? "180ms" : "0ms",
              }}
              className={`flex-1 bg-transparent text-white text-[14px] font-medium
                          border-b border-white/20 focus:border-[#e50914] focus:outline-none
                          py-1 placeholder:text-white/35 caret-[#e50914] transition-all
                          ${mobileSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            />

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
              className={`text-white/60 hover:text-white shrink-0 p-1 transition-all
                          ${mobileSearchOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile suggestions dropdown */}
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

      {/* ══════════════════════════════════════════
          MOBILE NAV DRAWER
      ══════════════════════════════════════════ */}
      <nav
        className={`lg:hidden flex flex-col py-8
                    fixed left-0 top-0 h-full w-72 z-[60]
                    border-r border-white/[0.06]
                    transition-transform duration-300
                    ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "rgba(5,5,5,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="px-5 mb-8 flex justify-between items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Absolute Cinema"
              className="h-8 w-auto object-contain"
            />
            <div className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mt-1">
              Premium Theater
            </div>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="text-white/50 hover:text-white p-2 transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-1 px-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200"
                    style={{
                      color: active ? "#fff" : "rgba(255,255,255,0.5)",
                      background: active ? "rgba(229,9,20,0.12)" : "transparent",
                      borderLeft: active ? "2px solid #e50914" : "2px solid transparent",
                    }}
                  >
                    <span>{link.label}</span>
                    {link.label === "My List" && watched.length > 0 && (
                      <span
                        className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-white"
                        style={{ fontSize: "10px", background: "#e50914" }}
                      >
                        {watched.length}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-5 mt-auto">
          <button
            className="w-full py-3 rounded-xl text-[13px] font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #e50914 0%, #b40710 100%)" }}
          >
            Upgrade to Pro
          </button>
        </div>
      </nav>

      {/* Drawer scrim */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
