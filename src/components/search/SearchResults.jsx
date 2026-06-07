"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../layout/Navbar";
import { useSearchParams } from "next/navigation";
import { useSearchResults } from "@/hooks/useSearchResult";
import { moviePicReturn } from "@/utils/pictureReturn";
import Link from "next/link";

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get("query");

  const {
    data: movieSearchResults,
    error: searchError,
    isPending: searchLoading,
  } = useSearchResults(query);
  console.log(movieSearchResults);

  // State management
  const [searchQuery, setSearchQuery] = useState("the batman");
  const [activeTab, setActiveTab] = useState("All Results");
  const [isScrolled, setIsScrolled] = useState(false);
  const loaderRef = useRef(null);

  // Sample data parsed from original markup
  // const movies = [
  //   {
  //     id: 1,
  //     title: "The Batman",
  //     year: "2022",
  //     genre: "Action, Drama",
  //     rating: "8.5",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN8R-ZXn3ZWKHMkjvUeteiqlf_5znhgc-cgCmo6BYjmhdRES0nnMv1SVqz74tRbAa660AXXtLHFcuU_g5HQaD0KZ5g5FzB-kka7ckggveUykVOJivZCndBohqknHVFTp5TfBPCdR7mPd5saKTLG2YILdtW3Nsg8p4S9-fGlEigp7zVHt2yjo99FQspOdiqMOixG-1U53ApIX1hwo-Oow65Z-v8Sd99Q4HGBO1RgNzRtlC19XEKgSgldzOAqW7EQY4WaPe7W8T_ASRj",
  //     alt: "A cinematic and moody movie poster for The Batman featuring a silhouette of a dark hero against a rainy, Gotham City backdrop.",
  //   },
  //   {
  //     id: 2,
  //     title: "Batman Begins",
  //     year: "2005",
  //     genre: "Action, Adventure",
  //     rating: "8.2",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB63BofOvTOY4GhPIY_ILubyQtaNvijZihfzjleV_Mr-naz-GPRVpUuGDyctMkxZ9JuJ1wVpVuBfztQW81oMcExpMhMNg0zBrrUMEuynfhDAxPthFVgcE40s1fWVIoASBWldshESYt4aF5nOU31PzZkotmjGWbqDMNTwKyg_VV1bQ8aAMAJHaq0FF-J-E3HNETuS-x2FjGkW2tSRcnVyhMctb71j2loAphwklRUKG_BZEs3acjrWDYmq-z25yezdB0L34nL8VXqdGAg",
  //     alt: "A dark and mysterious film poster of a caped crusader standing atop a skyscraper overlooking a foggy cityscape.",
  //   },
  //   {
  //     id: 3,
  //     title: "The Dark Knight",
  //     year: "2008",
  //     genre: "Action, Crime",
  //     rating: "9.0",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKv7bUM2NLcm3Hc0DflQL0Qph7xz-q8V3iMKXR4LKSmhkeoSC3a4k242RZspRC3_xA0JCVtg89N7gKKIDVM42uXzl4vujbBwlVYw0j8LXQisrnsBjA7Xqq_YtjhYYDzqPt0HGuXaMSfkNmJDYYB_58Lf0jOrbkUaPaJSmpF7U9O1cJoRE7XY7sIs-4MO3CiUU6jCmbvNBfVW2wvCXufBvj-NTboAB0EL5O3uTB7OERNoqBtbMCyK9NHQHQQMrMdSvSZAIzofptDlMh",
  //     alt: "An iconic superhero movie poster featuring a dark mask in the center with a dramatic play of light and shadow.",
  //   },
  //   {
  //     id: 4,
  //     title: "The Lego Batman Movie",
  //     year: "2017",
  //     genre: "Animation, Comedy",
  //     rating: "7.3",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC-spLaBO1LpCbLjzXxiQXkzC2tVpOaXWMNwhOCcFC5_Lh20iAVbQDVB4t1VZREfoiVOHWI_PeJBGPHyZQfw0Acm-9fjuo2LInbB4f6TfyUqyo52__rIuu8bewHCzlMhb39BjcZ_j-ab5iRtUuyOlXrpQodC2gYMtFRtyngHEbwJ3S64jwOcILphwChUgt_bOrbuDnzphdL4klwO9He1p0ZQ-MBd0TD4XvI7Ia5DRQ3Kgk-2iSaqDwClcrvMs-YR0zqiSRkJzJGMCX",
  //     alt: "A stylized animated movie poster with a playful yet cinematic take on a classic hero.",
  //   },
  //   {
  //     id: 5,
  //     title: "The Dark Knight Rises",
  //     year: "2012",
  //     genre: "Action, Thriller",
  //     rating: "8.4",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMDeO7m4jafV_tPKaOZHOnzDNFUOlxsYqmHt8WADreddUCMJU7s69vZdc8CdDihcPKJ67AA4IKmCJVQDAA2bde-jBzxJeJvIJv--85WkQmvpSpDMlXSK5krT54VlYitj6azhhnZnkR6QLnUBSlHGYAxs7BCcBf_-j-ybMtGW5hkj8ASiki4q8AsLF_j5Hd222dU0Ppn4wmd3G9quaa2vApSfzF9BmSlgPo1qtlaLS0KHHz9e9KmAGCCykVulJldkGwlK0fvxwRBQ-5",
  //     alt: "A high-contrast movie poster for an action thriller featuring a dark figure in a heavy leather suit.",
  //   },
  //   {
  //     id: 6,
  //     title: "Batman (1989)",
  //     year: "1989",
  //     genre: "Action, Fantasy",
  //     rating: "7.5",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSngXqNreVra7SFyFA0tLgbClA7yOLhx9Lic9PxM1Y_hKGhuoIDjEuW6savvSxFw9J6Js1JRzNUBqLjQKEt7dan_UcthmR5aKgMO1JOCTeCby3kJnuy7mFztrVoeI9IorxrsLaUeM2W-iDNsyjGjQfYr1N1eNaRZ0cmqH72vMEA75DRdJzz2aYZNwxjPKxinaJNRlgQ4WhSV1l7VCUDrEPjoKNWyvAqXvKNfNkYN6UkkZKzmQi7uzY4H9pwwDX_ogLkTJpq4JdbqVW",
  //     alt: "An atmospheric movie poster featuring a dark, gothic cityscape at night with a bright full moon.",
  //   },
  //   {
  //     id: 7,
  //     title: "Batman v Superman",
  //     year: "2016",
  //     genre: "Action, Sci-Fi",
  //     rating: "7.0",
  //     badgeBg: "bg-[#3ce36a]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAkmZkCF1zvwfjjYZaEiLvnpfbjMoKPlB_O0JBNzyaErtOrxKjEiBi4rntt9CEU6YdcD0kw653UCJ5jELNbPOlBMoue5tN7T2NTYQFHKKp-lJLYixK3iax55SQCHFARpkpQzdy2klM5539ie48ztEar6j_HtxoOLblm1xwaWhlzbctmZSj9ZwVOtEj2p_bXJ5wL8xKDLpGn1_yfa9nxvnkfJZA8ujBNzEvvFCwVvO_Y7BpXY--Q_Wchg7ZD-T62JZLobgIV7K0g5r7",
  //     alt: "A cinematic film poster featuring a dramatic face reveal in high-contrast shadows.",
  //   },
  //   {
  //     id: 8,
  //     title: "Justice League",
  //     year: "2021",
  //     genre: "Action, Adventure",
  //     rating: "8.1",
  //     badgeBg: "bg-[#e9c400]",
  //     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Q3bG49CKs54y5rQdpo06tuxtu2CYvC4_rOsJ1yHR8dbDSjd_rGqzPTWfmMkhaFW9Ei1gCcGFJp7-p4zfVBMqtXqs6GHNl6UUEdcVxFTUbh0WrfL6VNDVIRqaqLML-HKiYzSj5Cp49U66Ut9Tiktxp8Hf_JSFs0SyXYcaQBHvFsfvQXOoxZMDtHj5ttE0xnuauwn-7GJ82xq_d1xx7XoU7rx7fkRxHOAPeIc9zI1uZhncTFfAydyZ_drnM-ydCibmUrUbN4M-Zugq",
  //     alt: "A vibrant and energetic movie poster with a group of diverse characters in dynamic action poses.",
  //   },
  // ];

  // Handle header background shift on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock implementation for infinite scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Load more cinematic content...");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[1.4] font-medium selection:bg-[#e50914] selection:text-white min-h-screen antialiased">
      {/* Dynamic Font & Material Icon Injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
          line-height: 1;
        }
        .search-input-focus:focus-within {
          outline: 1px solid #af8782;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #131313;
        }
        ::-webkit-scrollbar-thumb {
          background: #353534;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #e50914;
        }
      `,
        }}
      />
      <Navbar />
      {/* Main Layout Area */}
      <main className="pt-[120px] pb-24 px-[1.5rem] md:px-[4rem] min-h-screen max-w-[1440px] mx-auto">
        {/* Results Header */}
        <div className="mb-10">
          <h1 className="font-['Montserrat',sans-serif] text-[48px] leading-[1.1] tracking-[-0.02em] font-extrabold text-white mb-2">
            Results for &quot;{query}&quot;
          </h1>
          <p className="text-[#e9bcb6] text-[18px] leading-[1.6] font-normal">
            Showing top results found in our cinematic database.
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1.5rem]">
          {movieSearchResults?.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className="group relative flex flex-col gap-3 cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#2a2a2a] transition-transform duration-300 group-hover:scale-105 group-hover:z-10 group-hover:shadow-2xl group-hover:shadow-black">
                <img
                  className="w-full h-full object-cover"
                  src={moviePicReturn(movie.poster_path)}
                  alt={movie.title}
                />

                {/* Rating Badge */}
                <div
                  className={`absolute bg-yellow-500 top-2 right-2 px-2 py-1  rounded font-['Plus_Jakarta_Sans',sans-serif] text-[13px] leading-none font-medium text-black`}
                >
                  {Math.round(movie.vote_average)}/10
                </div>

                {/* Hover Scrim Overlay */}
                <div className="movie-overlay absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <button className="w-full py-2 bg-primary-container text-white rounded-lg font-label-caps text-label-caps mb-2 hover:bg-primary-container/90 transition-colors">
                    Watch Trailer
                  </button>
                  <button className="w-full py-2 bg-transparent border border-white/20 text-white rounded-lg font-label-caps text-label-caps hover:bg-white/10 transition-colors">
                    Add to List
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-white font-['Montserrat',sans-serif] text-[14px] leading-[1.4] font-medium truncate">
                  {movie.title}
                </h3>
                <p className="text-[#e9bcb6] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] leading-none tracking-[0.05em] font-semibold mt-0.5">
                  {movie.release_date.split("-")[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer Area */}
      <footer className="w-full px-[1.5rem] md:px-[4rem] flex flex-col items-center gap-6 bg-[#131313] py-12 border-t border-[#5e3f3b]">
        <div className="flex flex-col items-center gap-4">
          <span className="font-['Montserrat',sans-serif] text-[24px] leading-[1.2] font-black text-[#e50914] tracking-tighter">
            Absolute Cinema
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              className="text-[#e9bcb6] text-[14px] leading-[1.4] font-medium hover:text-[#e50914] transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-[#e9bcb6] text-[14px] leading-[1.4] font-medium hover:text-[#e50914] transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-[#e9bcb6] text-[14px] leading-[1.4] font-medium hover:text-[#e50914] transition-colors"
              href="#"
            >
              Help Center
            </a>
            <a
              className="text-[#e9bcb6] text-[14px] leading-[1.4] font-medium hover:text-[#e50914] transition-colors"
              href="#"
            >
              Contact Us
            </a>
          </div>
        </div>
        <p className="text-[#e9bcb6] text-[14px] leading-[1.4] font-medium opacity-80">
          © 2024 Absolute Cinema. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
