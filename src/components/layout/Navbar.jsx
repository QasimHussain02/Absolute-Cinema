"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Web Navbar */}
      <nav className="hidden md:flex bg-surface/80 backdrop-blur-xl text-primary font-body-md text-body-md fixed top-0 w-full z-50 shadow-2xl shadow-primary/10 border-b border-white/5">
        <div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-12">
            <Link href="/" className="font-headline-md text-headline-md font-bold text-primary-container">
              Absolute Cinema
            </Link>
            <ul className="flex items-center gap-8">
              <li><Link href="/" className="text-primary border-b-2 border-primary pb-1 font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300">Discover</Link></li>
              <li><Link href="/" className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300">Movies</Link></li>
              <li><Link href="/" className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300">TV Shows</Link></li>
              <li><Link href="/" className="text-on-surface-variant font-body-md text-body-md active:scale-95 transition-transform hover:text-primary transition-colors duration-300">My List</Link></li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Search..." className="bg-[#050505] text-on-surface border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md w-64" />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors active:scale-95">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXsQtpdF3LP1F6Bmn4bCSfgMKirToba4kZSTIqkw3HtGX6EwlnEa2jlZh0PPXegQP2EYDJ-oc11DYwaDLCSpN20vfdibPCXQZWQaHml3bXL51s0cQYcFazGVdg9yg90BWOP4_HG-oY1n7vGNOE12zrlta91Qpx-fbNL7lst8jqiU9wgFCT7y6P-pdILu46aNdIQMPmwdCXGIvKnXnCKo7gHbVR1C5kmTezfd7cb4DxPejnDGKVUIeQqY5ShvAEaa-3n0mbI96REea4" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-30 bg-surface/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between p-margin-mobile">
        <button onClick={() => setMobileNavOpen(true)} className="text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-headline-md text-headline-md font-bold text-primary-container">Absolute Cinema</span>
        <button className="text-on-surface">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      <nav className={`md:hidden flex flex-col py-8 bg-surface text-primary font-label-caps text-label-caps fixed left-0 top-0 h-full w-64 z-40 border-r border-white/5 shadow-xl transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-4 mb-8 flex justify-between items-center">
          <div>
            <div className="font-headline-xl text-headline-xl text-primary-container">Absolute Cinema</div>
            <div className="text-on-surface-variant font-metadata text-metadata mt-1">Premium Theater</div>
          </div>
          <button onClick={() => setMobileNavOpen(false)} className="text-on-surface-variant p-2">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            <li><Link href="/" className="flex items-center gap-4 bg-primary-container/10 text-primary border-r-4 border-primary p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"><span className="material-symbols-outlined">home</span>Home</Link></li>
            <li><Link href="/" className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"><span className="material-symbols-outlined">trending_up</span>Trending</Link></li>
            <li><Link href="/" className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"><span className="material-symbols-outlined">new_releases</span>New Releases</Link></li>
            <li><Link href="/" className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"><span className="material-symbols-outlined">star</span>Top Rated</Link></li>
            <li><Link href="/" className="flex items-center gap-4 text-on-surface-variant p-4 active:translate-x-1 hover:bg-surface-container-high transition-all"><span className="material-symbols-outlined">calendar_today</span>Upcoming</Link></li>
          </ul>
        </div>
        <div className="p-4 mt-auto">
          <button className="w-full py-3 bg-primary-container text-white rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity">Upgrade to Pro</button>
        </div>
      </nav>
    </>
  );
}
