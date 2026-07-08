'use client';
import { GameRow, getSatta } from "@/app/lib/satta";
import Image from "next/image";
import React, { useEffect, useState } from "react";


export default function SattaResultTable() {

    const [satta, setSatta] = useState<GameRow[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const results = await getSatta({
                dateFrom: "2025-07-06",
                dateTo: "2025-07-07",
            });

            setSatta(results);
        };

        loadData();
    }, []);

    return (
        <div>
            <div className="w-full bg-white py-6 font-sans select-none flex justify-center">
                <div className="w-full max-w-8xl border border-gray-400 overflow-hidden shadow-sm">

                    {/* TABLE HEADERS */}
                    <div className="grid grid-cols-3 bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                        <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                        <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                        <div className="py-1">आज का रिजल्ट</div>
                    </div>

                    {/* TABLE ROWS */}
                    <div className="divide-y divide-gray-300">
                        {satta.map((game, index) => (
                            <div key={index} className="grid grid-cols-3 items-center text-center">

                                {/* Column 1: Name & Timing */}
                                <div className="bg-[#FFD200] py-3 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                    <span className="text-black font-bold text-sm sm:text-xl tracking-tight leading-tight">
                                        {game.name}
                                    </span>
                                    <span className="text-black font-bold text-sm sm:text-xl tracking-tight leading-tight mt-2">
                                        {game.time}
                                    </span>
                                </div>

                                {/* Column 2: Yesterday's Result */}
                                <div className="py-3 text-black font-bold text-sm sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
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
            </div><div className="w-full bg-white py-6 font-sans select-none flex justify-center">
                <div className="w-full max-w-8xl border border-gray-400 overflow-hidden shadow-sm">

                    {/* TABLE HEADERS */}
                    <div className="grid grid-cols-3 bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                        <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                        <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                        <div className="py-1">आज का रिजल्ट</div>
                    </div>

                    {/* TABLE ROWS */}
                    <div className="divide-y divide-gray-300">
                        {satta.map((game, index) => (
                            <div key={index} className="grid grid-cols-3 items-center text-center">

                                {/* Column 1: Name & Timing */}
                                <div className="bg-[#FFD200] py-3 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                    <span className="text-black font-bold text-sm sm:text-xl tracking-tight leading-tight">
                                        {game.name}
                                    </span>
                                    <span className="text-black font-bold text-sm sm:text-xl tracking-tight leading-tight mt-2">
                                        {game.time}
                                    </span>
                                </div>

                                {/* Column 2: Yesterday's Result */}
                                <div className="py-3 text-black font-bold text-sm sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
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