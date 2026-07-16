"use client";

import { useQuery } from "@tanstack/react-query";
import WeeklyResultTable from "./WeeklyResultTable";

// Define the shape of our returned Month-to-Date data
export interface MonthlyGameRow {
  game: string;
  time: string;
  tableNo?: 1 | 2;
  slug: string;
  dates: string[];
  result: (string | null)[];
}

// Fetcher function for TanStack Query
const fetchMonthlyResults = async (): Promise<MonthlyGameRow[]> => {
  const res = await fetch("/api/data?range=monthly");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || "Failed to fetch data");
  }
  return json.data;
};

export default function MonthlyResultsSection() {
  // Determine date metrics for labels
  const currentISTDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const selectedMonth = currentISTDate.toLocaleString("en-US", { month: "long" });
  const selectedYear = String(currentISTDate.getFullYear());
  const searchQuery = "";

  // TanStack Query Implementation
  const { data: allGames = [], isLoading, isError, error } = useQuery<MonthlyGameRow[]>({
    queryKey: ["monthlyResults"],
    queryFn: fetchMonthlyResults,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });

  // Client-side partitioning/filtering of static array state
  const table1 = allGames.filter((game) => game.tableNo === 1);
  const table2 = allGames.filter((game) => game.tableNo === 2);

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center gap-3 text-gray-400 font-medium">
        <svg className="animate-spin h-8 w-8 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-sm">Loading dashboard charts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-xl text-sm font-medium">
        Error loading monthly data: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Table 1 Viewport */}
      <WeeklyResultTable
        title={`${selectedMonth.toUpperCase()} SATTA RESULT CHART`}
        data={table1}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      {/* Table 2 Viewport */}
      <WeeklyResultTable
        title={`${selectedMonth.toUpperCase()} ADDITIONAL ENTRIES`}
        data={table2}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
}