// components/WeeklyResultTable.tsx

interface WeeklyGameRow {
  game: string;
  results: string[];
}

interface Props {
  title?: string;
  data: WeeklyGameRow[];
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
  const filteredGames = data.filter((row) =>
    row.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDays = 7;

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
              <th className="py-3 px-4 w-32 sticky left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center">
                Date
              </th>

              {filteredGames.map((game) => (
                <th
                  key={game.game}
                  className="py-3 px-2 text-center border-r border-black/40 text-[10px] w-24"
                >
                  {game.game}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-black/30 text-xs font-bold bg-white text-black">
            {Array.from({ length: totalDays }).map((_, dayIdx) => {
              const dayStr = `${(dayIdx + 1)
                .toString()
                .padStart(2, "0")}-07`;

              return (
                <tr
                  key={dayIdx}
                  className="hover:bg-yellow-50 transition-colors border-b border-black/40"
                >
                  <td className="py-3 px-4 font-black w-32 sticky left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center shadow-[2px_0_5px_rgba(0,0,0,0.1)] font-mono">
                    {dayStr}
                  </td>

                  {filteredGames.map((row) => {
                    const value = row.results[dayIdx] || "-";

                    return (
                      <td
                        key={`${row.game}-${dayIdx}`}
                        className="py-3 px-2 text-center border-r border-black/25 font-mono text-sm"
                      >
                        {value === "-" ? (
                          <span className="text-black/35 font-bold">-</span>
                        ) : (
                          <span className="font-extrabold">{value}</span>
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