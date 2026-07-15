"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllYearlyData } from "@/app/lib/satta";

interface SattaGame {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface ChartRow {
  day: number;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
}

export default function YearlyChartAdminPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  // Fetch games list from the database
  const { data: gamesData, isLoading: isGamesLoading } = useQuery({
    queryKey: ["adminSattaGames"],
    queryFn: async () => {
      const res = await fetch("/api/satta");
      const json = await res.json();
      return (json.data || []) as SattaGame[];
    },
  });

  // Fetch ALL yearly results for the hardcoded year 2026
  const { data: responseData, isLoading: isChartLoading, error } = useQuery({
    queryKey: ["allYearlyData", 2026],
    queryFn: () => fetchAllYearlyData(2026),
    refetchInterval: 30000,
    staleTime: 10000,
  });

  // Set default selected game once games load
  useEffect(() => {
    if (gamesData && gamesData.length > 0 && !selectedSlug) {
      setSelectedSlug(gamesData[0].slug);
    }
  }, [gamesData, selectedSlug]);

  // Filter specific game data locally
  const gameData = responseData?.data?.find(
    (g) => g.slug.toLowerCase() === selectedSlug.toLowerCase()
  );

  const headers = [
    "2026", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const monthsAbbr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const monthsFull = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const chartData: ChartRow[] = Array.from({ length: 31 }, (_, idx) => {
    const day = idx + 1;
    const row: any = { day };
    monthsAbbr.forEach((abbr, mIdx) => {
      const fullMonthName = monthsFull[mIdx];
      const val = gameData?.months?.[fullMonthName]?.[day];
      row[abbr] = val !== undefined && val !== null ? val : "-";
    });
    return row as ChartRow;
  });

  const isLoading = isGamesLoading || isChartLoading;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Yearly Results Chart</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          View full year results matrix for any satta game.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 space-y-1.5 w-full">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Satta</label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full text-black bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 appearance-none cursor-pointer font-semibold"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='gray'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "20px"
            }}
          >
            {gamesData?.map((game) => (
              <option key={game._id} value={game.slug}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-48 space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</label>
          <select
            disabled
            value="2026"
            className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none font-semibold cursor-not-allowed"
          >
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      {/* Yearly Results Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
            {gameData?.game || "Yearly Result"} - Yearly Chart 2026
          </h2>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
            <svg className="animate-spin h-8 w-8 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm">Loading yearly results...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-600 font-semibold text-sm">
            Failed to load chart results. Please try again.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[900px] border-collapse text-center text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className={`py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500 ${index === 0 ? "text-[#e11d48] border-r border-gray-200" : ""
                        }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chartData.map((row) => (
                  <tr key={row.day} className="hover:bg-gray-50/50 transition-colors">
                    {/* Day Index Column */}
                    <td className="py-2.5 text-[15px] font-bold text-[#e11d48] border-r border-gray-100/80 bg-gray-50/30">
                      {row.day}
                    </td>

                    {/* Months (JAN - DEC) */}
                    {monthsAbbr.map((abbr) => {
                      const val = row[abbr as keyof ChartRow] as string;
                      const isPlaceholder = val === "-";
                      return (
                        <td
                          key={abbr}
                          className={`py-2.5 text-[15px] ${isPlaceholder ? "font-normal text-gray-400" : "font-bold text-gray-800"
                            }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
