import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <>
    
    
   
    <nav className="w-full bg-black py-4 gap-4 border-b-4 border-black">
        <div className="w-full max-w-8xl px-2 py-4 sm:px-6 grid grid-cols-4 mx-auto items-center justify-center gap-x-2 sm:gap-x-14 gap-y-4">
        
        {/* Brand/Logo Pill Button */}
        <Link
          href="/"
          className="bg-white text-black w-full font-semibold text-[10px] sm:text-sm px-2 py-2 sm:px-9 sm:py-2.5 rounded-full border border-black sm:shadow-[2px_2px_0px_#ffffff] hover:sm:shadow-[2px_2px_0px_#FFD200] transition-all duration-150 tracking-wider text-nowrap text-center"
        >
          A7SATTA 🏠
        </Link>

        {/* Navigation Link: CHART */}
        <Link
          href="/chart"
          className="bg-[#ffd800] text-black font-semibold text-[10px] sm:text-sm px-4 py-2 sm:px-9 sm:py-2.5 rounded-full border border-black sm:shadow-[2px_2px_0px_#ffffff] hover:sm:shadow-[2px_2px_0px_#ffd800] transition-all duration-150 tracking-wider text-center"
        >
          CHART
        </Link>

        {/* Navigation Link: CONTACT */}
        <Link
          href="/contact"
          className="bg-[#ffd800] text-black font-semibold text-[10px] sm:text-sm px-4 py-2 sm:px-9 sm:py-2.5 rounded-full border border-black sm:shadow-[2px_2px_0px_#ffffff] hover:sm:shadow-[2px_2px_0px_#ffd800] transition-all duration-150 tracking-wider text-center"
        >
          CONTACT
        </Link>

        {/* Navigation Link: LOGIN */}
        <Link
          href="/login"
          className="bg-[#ffd800] text-black font-semibold text-[10px]  sm:text-sm px-4 py-2 sm:px-9 sm:py-2.5 rounded-full border border-black sm:shadow-[2px_2px_0px_#ffffff] hover:sm:shadow-[2px_2px_0px_#ffd800] transition-all duration-150 tracking-wider text-center"
        >
          LOGIN
        </Link>

      </div>
        <div className="w-full bg-gradient-to-r border-t  overflow-hidden shadow-inner">
        {/* Marquee Ticker Banner Track */}
        <div className="w-full bg-gradient-to-r py-1.5 border-t overflow-hidden shadow-inner">
          {React.createElement('marquee', {
            behavior: 'scroll',
            direction: 'left',
            scrollamount: '5',
            className: 'text-[#140E05] font-bold text-xs sm:text-sm tracking-wide flex items-center text-white',
          }, "✨ Welcome to A7 SATTA KING Official Website! Stay updated with historical data insights, game rule books, and real-time live winning news updates around the clock. 🚀")}
        </div>
      </div>
      </nav>
 {/* 2. MAIN BRAND HEADER (Yellow background, big title) */}
          <header className="w-full bg-[#ffd800] py-8 text-center select-none overflow-hidden">
            {/* Custom Keyframes Style Injection */}
            <style>{`
            @keyframes strictOpacityFade {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .animate-custom-fade {
              animation: strictOpacityFade 2s ease-in-out infinite;
            }
          `}</style>
    
    <Link href={"/"}>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black uppercase animate-custom-fade">
              A7 SATTA KING OFFICIAL
            </h1>
    </Link>
            
          </header></>
  );
}