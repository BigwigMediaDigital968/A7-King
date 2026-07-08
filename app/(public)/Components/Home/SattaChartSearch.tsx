import React, { useState } from "react";

export default function SattaChartSearch() {
  const [selectedGame, setSelectedGame] = useState("DAMAN");
  const [selectedYear, setSelectedYear] = useState("2026");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean strings to make clean URL pathing slugs
    const gameSlug = selectedGame.toLowerCase().replace(/\s+/g, "-");
    
    // Perform standard client-side routing redirect
    // Updates window path to something like: /charts/daman/2026
    window.location.href = `/charts/${gameSlug}/${selectedYear}`;
  };

  return (
    <div className="w-full bg-white font-sans select-none">

      {/* Main Search Controls Container Row */}
      <div className="w-full py-0 px-4 flex justify-center items-center">
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl flex items-center justify-center gap-2"
        >
          {/* Game Dropdown Selection Element */}
          <div className="w-48 sm:w-64">
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full bg-white text-black font-semibold text-sm sm:text-base px-4 py-2 rounded border-2 border-[#FFD200] outline-none appearance-none cursor-pointer tracking-wide"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='black'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                backgroundSize: "20px"
              }}
            >
              <option value="DAMAN">DAMAN</option>
              <option value="SADAR BAZAR">SADAR BAZAR</option>
              <option value="GWALIOR">GWALIOR</option>
              <option value="DELHI BAZAR">DELHI BAZAR</option>
              <option value="DELHI MATKA">DELHI MATKA</option>
              <option value="SHRI GANESH">SHRI GANESH</option>
            </select>
          </div>

          {/* Year Dropdown Selection Element */}
          <div className="w-28 sm:w-36">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white text-black font-semibold text-sm sm:text-base px-4 py-2 rounded border-2 border-[#FFD200] outline-none appearance-none cursor-pointer tracking-wide"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='black'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                backgroundSize: "20px"
              }}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Submission Trigger Action Button */}
          <button
            type="submit"
            className="bg-[#FFD200] hover:bg-[#e6bd00] text-black font-semibold text-xs sm:text-sm px-5 py-3 rounded transition-colors duration-150 active:scale-98 cursor-pointer shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
          >
            Check
          </button>
        </form>
      </div>
    </div>
  );
}