"use client";

import { useEffect, useState } from "react";
import WeeklyResultTable from "./WeeklyResultTable";
import { getWeeklyResults, WeeklyGameRow } from "@/app/lib/satta";

export default function WeeklyResultsSection() {
  const [table1, setTable1] = useState<WeeklyGameRow[]>([]);
  const [table2, setTable2] = useState<WeeklyGameRow[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedMonth = "July";
  const selectedYear = "2025";
  const searchQuery = "";

  useEffect(() => {
    const loadData = async () => {
      const data = await getWeeklyResults();

      setTable1(data.table1);
      setTable2(data.table2);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-4 font-bold">Loading weekly results...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <WeeklyResultTable
        title="SATTA RESULT CHART"
        data={table1}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <WeeklyResultTable
        data={table2}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
}