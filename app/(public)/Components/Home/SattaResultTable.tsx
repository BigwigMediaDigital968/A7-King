import Image from "next/image";
import React from "react";

interface GameRow {
    name: string;
    time: string;
    yesterdayResult: string;
    todayResult: string | "NEW";
}

export default function SattaResultTable() {
    const gamesData: GameRow[] = [
        { name: "SADAR BAZAR", time: "1:40 PM", yesterdayResult: "21", todayResult: "99" },
        { name: "GWALIOR", time: "2:40 PM", yesterdayResult: "07", todayResult: "19" },
        { name: "DELHI BAZAR", time: "3:15 PM", yesterdayResult: "57", todayResult: "26" },
        { name: "DELHI MATKA", time: "3:40 PM", yesterdayResult: "97", todayResult: "NEW" },
        { name: "SHRI GANESH", time: "4:40 PM", yesterdayResult: "54", todayResult: "NEW" },
        { name: "AGRA", time: "5:30 PM", yesterdayResult: "68", todayResult: "NEW" },
        { name: "FARIDABAD", time: "6:10 PM", yesterdayResult: "19", todayResult: "NEW" },
        { name: "ALWAR", time: "7:35 PM", yesterdayResult: "23", todayResult: "NEW" },
        { name: "GAZIABAD", time: "9:50 PM", yesterdayResult: "54", todayResult: "NEW" },
        { name: "DWARKA", time: "10:35 PM", yesterdayResult: "76", todayResult: "NEW" },
        { name: "GALI", time: "11:50 PM", yesterdayResult: "50", todayResult: "NEW" },
    ];

    return (
        <div>
            <div className="w-full bg-white py-6 px-4 font-sans select-none flex justify-center">
            <div className="w-full max-w-8xl border border-gray-400 overflow-hidden shadow-sm">

                {/* TABLE HEADERS */}
                <div className="grid grid-cols-3 bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                    <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                    <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                    <div className="py-1">आज का रिजल्ट</div>
                </div>

                {/* TABLE ROWS */}
                <div className="divide-y divide-gray-300">
                    {gamesData.map((game, index) => (
                        <div key={index} className="grid grid-cols-3 items-center text-center">

                            {/* Column 1: Name & Timing */}
                            <div className="bg-[#FFD200] py-3 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                <span className="text-black font-bold text-lg sm:text-xl tracking-tight leading-tight">
                                    {game.name}
                                </span>
                                <span className="text-black font-bold text-lg sm:text-xl tracking-tight leading-tight mt-2">
                                    {game.time}
                                </span>
                            </div>

                            {/* Column 2: Yesterday's Result */}
                            <div className="py-3 text-black font-bold text-lg sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
                                {game.yesterdayResult}
                            </div>

                            {/* Column 3: Today's Result or "New" Badge */}
                            <div className="py-3 bg-white h-full flex items-center justify-center">
                                {game.todayResult === "NEW" ? (
                                    <div className="w-10 h-10">
                                        <Image
                                            src="/new.gif"
                                            alt=""
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />                  </div>
                                ) : (
                                    <span className="text-black font-bold text-lg sm:text-xl">
                                        {game.todayResult}
                                    </span>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div><div className="w-full bg-white py-6 px-4 font-sans select-none flex justify-center">
            <div className="w-full max-w-8xl border border-gray-400 overflow-hidden shadow-sm">

                {/* TABLE HEADERS */}
                <div className="grid grid-cols-3 bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                    <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                    <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                    <div className="py-1">आज का रिजल्ट</div>
                </div>

                {/* TABLE ROWS */}
                <div className="divide-y divide-gray-300">
                    {gamesData.map((game, index) => (
                        <div key={index} className="grid grid-cols-3 items-center text-center">

                            {/* Column 1: Name & Timing */}
                            <div className="bg-[#FFD200] py-3 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                <span className="text-black font-bold text-lg sm:text-xl tracking-tight leading-tight">
                                    {game.name}
                                </span>
                                <span className="text-black font-bold text-lg sm:text-xl tracking-tight leading-tight mt-2">
                                    {game.time}
                                </span>
                            </div>

                            {/* Column 2: Yesterday's Result */}
                            <div className="py-3 text-black font-bold text-lg sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
                                {game.yesterdayResult}
                            </div>

                            {/* Column 3: Today's Result or "New" Badge */}
                            <div className="py-3 bg-white h-full flex items-center justify-center">
                                {game.todayResult === "NEW" ? (
                                    <div className="w-10 h-10">
                                        <Image
                                            src="/new.gif"
                                            alt=""
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />                  </div>
                                ) : (
                                    <span className="text-black font-bold text-lg sm:text-xl">
                                        {game.todayResult}
                                    </span>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
        </div>
    );
}