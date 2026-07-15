'use client';
import { fetchDailyData, hasTimePassed } from "@/app/lib/results";
import { GameRow, getSatta } from "@/app/lib/satta";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function SattaResultTable() {

    const { data: satta = [], isLoading, error } = useQuery({
        queryKey: ["satta", "daily"],
        queryFn: fetchDailyData,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <div>
            <div className="w-full bg-white py-6 font-sans select-none flex justify-center">
                <div className="w-full max-w-8xl border border-gray-400 overflow-hidden shadow-sm">

                    {/* TABLE HEADERS */}
                    <div className="grid grid-cols-[4fr_3fr_3fr] bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                        <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                        <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                        <div className="py-1">आज का रिजल्ट</div>
                    </div>

                    {/* TABLE ROWS */}
                    <div className="divide-y divide-gray-300">
                        {satta.filter((item) => item.tableNo === 1).map((game, index) => (
                            <div key={game?._id} className="grid grid-cols-[4fr_3fr_3fr]  items-center text-center">

                                {/* Column 1: Name & Timing */}
                                <div className="bg-[#FFD200] py-2 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                    <Link href={`/${game.slug}`} className="text-black font-bold text-[22px] tracking-tight leading-tight uppercase hover:text-blue-800">
                                        {game?.game}
                                    </Link>
                                    <span className="text-black font-bold text-base sm:text-xl tracking-tight leading-tight mt-2">
                                        {game.time}
                                    </span>
                                </div>

                                {/* Column 2: Yesterday's Result */}
                                <div className="py-2 text-black font-bold text-[22px] sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
                                    {game.result?.[0] ?? "-"}
                                </div>

                                {/* Column 3 - Today Result */}
                                <div className="py-2 bg-white h-full flex items-center justify-center">
                                    {!hasTimePassed(game.time) ? (
                                        <div className="w-10 h-10">
                                            <Image
                                                src="/new.gif"
                                                alt="New"
                                                width={300}
                                                height={300}
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-black font-bold text-[22px] sm:text-xl">
                                            {game.result?.[1]??"-"}
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
                    <div className="grid grid-cols-[4fr_3fr_3fr] bg-black text-center text-white text-base font-bold py-2 border-b border-gray-400">
                        <div className="border-r border-gray-600/50 py-1">सट्टा का नाम</div>
                        <div className="border-r border-gray-600/50 py-1">कल आया था</div>
                        <div className="py-1">आज का रिजल्ट</div>
                    </div>

                    {/* TABLE ROWS */}
                    <div className="divide-y divide-gray-300">
                        {satta.filter((item) => item.tableNo === 2).map((game, index) => (
                            <div key={game?._id} className="grid grid-cols-[4fr_3fr_3fr] items-center text-center">

                                {/* Column 1: Name & Timing */}
                                <div className="bg-[#FFD200] py-3 px-2 flex flex-col justify-center items-center h-full border-r border-gray-300">
                                    <Link href={`/${game.slug}`} className="text-black font-bold text-[22px] tracking-tight leading-tight uppercase hover:text-blue-800">
                                        {game.game}
                                    </Link>
                                    <span className="text-black font-bold text-sm sm:text-xl tracking-tight leading-tight mt-2">
                                        {game.time}
                                    </span>
                                </div>

                                {/* Column 2: Yesterday's Result */}
                                <div className="py-2 text-black font-bold text-[22px] sm:text-xl border-r border-gray-300 bg-white h-full flex items-center justify-center">
                                    {game.result?.[0] ?? "-"}
                                </div>

                                {/* Column 3 - Today Result */}
                                <div className="py-2 bg-white h-full flex items-center justify-center">
                                    {!hasTimePassed(game.time) ? (
                                        <div className="w-10 h-10">
                                            <Image
                                                src="/new.gif"
                                                alt="New"
                                                width={300}
                                                height={300}
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-black font-bold text-[22px] sm:text-xl">
                                            {game.result?.[1]??"-"}
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