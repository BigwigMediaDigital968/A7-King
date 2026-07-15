"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { fetchAllYearlyData } from "@/app/lib/satta";

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

export default function SattaYearlyChart() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = (params?.slug as string) || "daman";

  // Read selectedYear from query params, defaulting to current year
  const yearQuery = searchParams.get("year");
  const defaultYear = yearQuery ? parseInt(yearQuery, 10) : new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  // Sync state if query param changes
  useEffect(() => {
    if (yearQuery) {
      const y = parseInt(yearQuery, 10);
      if (!isNaN(y)) {
        setSelectedYear(y);
      }
    }
  }, [yearQuery]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("year", String(year));
    router.push(`/${slug}?${newParams.toString()}`);
  };

  // TanStack Query to fetch ALL yearly data for auto refresh and caching
  const { data: responseData, isLoading, error } = useQuery({
    queryKey: ["allYearlyData", selectedYear],
    queryFn: () => fetchAllYearlyData(selectedYear),
    refetchInterval: 30000, // Auto refresh every 30 seconds
    staleTime: 10000,       // Cache fresh time 10 seconds
  });

  // Filter game data locally
  const gameData = responseData?.data?.find(
    (g) => g.slug.toLowerCase() === slug.toLowerCase()
  );

  const gameName = gameData?.game || slug.toUpperCase().replace("-", " ");

  const headers = [
    String(selectedYear), "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
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

  return (
    <div className="w-full bg-white pb-10 font-sans select-none">

      {/* Top Header Banner with exact Yellow-to-Orange Gradient */}
      <div className="w-full bg-gradient-to-b from-[#FFA500] to-[#FFD200] py-5 text-center border-b-2 border-black/90">
        <h2 className="text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider uppercase">
          {gameName} YEARLY CHART {selectedYear}
        </h2>

        {/* Year Selector */}
        {/* <div className="mt-3 flex justify-center items-center gap-2">
          <label htmlFor="year-select" className="text-black font-bold text-xs sm:text-sm uppercase tracking-wider">
            Select Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
            className="bg-white text-black font-black px-3 py-1.5 rounded-lg border border-black/25 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            {Array.from({ length: 6 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div> */}
      </div>

      {/* Swipe Assistance Note for Mobile viewports */}
      <div className="block lg:hidden text-center text-[10px] text-gray-500 font-bold py-1 bg-gray-50 border-b border-gray-100">
        ← Swipe left / right to view complete year →
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="w-full py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FFA500] border-t-transparent"></div>
          <p className="mt-4 text-black font-bold text-sm">Loading yearly chart data...</p>
        </div>
      ) : error ? (
        <div className="w-full py-20 text-center text-red-600 font-bold text-sm">
          <p>Failed to load chart data. Please try again later.</p>
        </div>
      ) : (
        /* Responsive Table Wrapper */
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[900px] border-collapse text-center">

            {/* Table Headers */}
            <thead>
              <tr className="border-b border-gray-200">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`py-3 text-xs sm:text-sm font-black tracking-wider text-black ${index === 0 ? "text-[#0022ff]" : ""
                      }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/70">
              {chartData.map((row) => (
                <tr key={row.day} className="hover:bg-gray-50/50 transition-colors duration-100">
                  {/* Date Index Column */}
                  <td className="relative py-2 text-[17px] font-bold text-[#0022ff] border-r border-gray-100/30">
                    {row.day}
                    <span className="w-[80%] left-1/2 -translate-x-1/2 h-0 border-t border-gray-300 absolute bottom-0">

                    </span>
                  </td>

                  {/* Results Columns (JAN - DEC) */}
                  {monthsAbbr.map((abbr) => {
                    const val = row[abbr as keyof ChartRow] as string;
                    const isPlaceholder = val === "-";
                    return (
                      <td
                        key={abbr}
                        className={`relative py-2 text-[17px] ${isPlaceholder ? "font-black text-black/40" : "font-bold text-[#0022ff]"
                          }`}
                      >
                        {val}
                        <span className="w-[80%] left-1/2 -translate-x-1/2 h-0 border-t border-gray-200 absolute bottom-0">

                        </span>
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
  );
}