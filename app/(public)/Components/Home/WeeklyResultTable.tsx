// components/WeeklyResultTable.tsx

import { MonthlyGameRow } from "./WeeklyResultsSection";

interface Props {
  title?: string;
  data: MonthlyGameRow[];
  searchQuery: string;
  selectedMonth: string;
  selectedYear: string;
}

export default function WeeklyResultTable({
  title,
  data,
  searchQuery,
  selectedMonth,
  selectedYear,
}: Props) {
  // Filter games based on search query
  const filteredGames = data.filter((row) =>
    row.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extract date list dynamically from the dynamic dataset array, default to empty if empty array is passed
  const availableDates = data[0]?.dates || [];
  const totalDays = availableDates.length;

  return (
    <div className="flex flex-col border-2 border-black overflow-hidden">
      {title && (
        <div className="w-full bg-gradient-to-b from-orange-400 to-[#ffd200] border-b-2 border-black py-4 text-center">
          <h3 className="text-xl sm:text-3xl font-semibold text-black tracking-wider uppercase">
            {title} {selectedMonth.toUpperCase()} {selectedYear}
          </h3>
        </div>
      )}

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-[#ffd200] text-black border-b-2 border-black text-xs font-extrabold uppercase">
              <th className="py-3 px-4 min-w-[120px] left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center">
                Date
              </th>

              {filteredGames.map((game, index) => (
                <th
                  key={game.game + index}
                  className="py-3 px-2 text-center border-r border-black/40 text-xs min-w-[120px]"
                >
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    <span>{game.game}</span>
                    {/* <span className="text-[10px] text-black/60 font-mono font-medium lowercase">
                      ({game.time})
                    </span> */}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-black/30 text-xs font-bold bg-white text-black">
            {Array.from({ length: totalDays }).map((_, dayIdx) => {
              // Read exact target index labels directly from API configuration array sequence strings
              const rawDateLabel = availableDates[dayIdx] || "";

              // Clean formatting display view presentation labels (transforms "2026-07-16" into clean text like "16-Jul")
              let formattedDateView = rawDateLabel;
              if (rawDateLabel) {
                const parts = rawDateLabel.split("-");

                if (parts.length === 3) {
                  const day = parts[2];
                  const month = parts[1];

                  formattedDateView = `${day}-${month}`;
                }
              }

              return (
                <tr
                  key={dayIdx}
                  className="hover:bg-yellow-50 transition-colors border-b border-black/40"
                >
                  <td className="py-3 px-4 font-black w-32 text-[13px] left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center shadow-[2px_0_5px_rgba(0,0,0,0.1)] font-mono">
                    {formattedDateView}
                  </td>

                  {filteredGames.map((row) => {
                    // Match singular layout context response structures safely
                    const value = row.result?.[dayIdx] ?? "-";

                    return (
                      <td
                        key={`${row.game}-${dayIdx}`}
                        className="py-1 px-2 text-center border-r border-black/25 font-mono text-sm"
                      >
                        {value === "-" || value === null ? (
                          <span className="text-black/35 font-bold">-</span>
                        ) : (
                          <span className="font-extrabold text-gray-900">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}