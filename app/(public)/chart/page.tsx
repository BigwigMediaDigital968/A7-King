import Link from "next/link";
import React from "react";

export default function SattaChartLinksGrid() {
    const charts = [
        { name: "DAMAN SATTA KING CHART 2026", isActive: false },
        { name: "KAROL BAGH SATTA KING CHART 2026", isActive: false },
        { name: "RAJ SHREE SATTA KING CHART 2026", isActive: false },
        { name: "GALI SATTA KING CHART 2026", isActive: false },
        { name: "DWARKA SATTA KING CHART 2026", isActive: false },
        { name: "GAZIABAD SATTA KING CHART 2026", isActive: false },
        { name: "ALWAR SATTA KING CHART 2026", isActive: true }, // Black active state
        { name: "FARIDABAD SATTA KING CHART 2026", isActive: false },
        { name: "AGRA SATTA KING CHART 2026", isActive: false },
        { name: "SHRI GANESH SATTA KING CHART 2026", isActive: false },
        { name: "DELHI BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "GWALIOR SATTA KING CHART 2026", isActive: false },
        { name: "SADAR BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "DISAWER SATTA KING CHART 2026", isActive: false },
        { name: "HR SATTA KING CHART 2026", isActive: false },
        { name: "UJJALA SUPER SATTA KING CHART 2026", isActive: false },
        { name: "NEW GANSA SATTA KING CHART 2026", isActive: false },
        { name: "DELHI MATKA SATTA KING CHART 2026", isActive: false },
        { name: "DEHRADUN CITY SATTA KING CHART 2026", isActive: false },
        { name: "KKR CITY SATTA KING CHART 2026", isActive: false },
        { name: "DELHI DARBAR SATTA KING CHART 2026", isActive: false },
        { name: "MANDI BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "MADHUPURI SATTA KING CHART 2026", isActive: false },
        { name: "FATEHABAD SATTA KING CHART 2026", isActive: false },
        { name: "LION BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "SIALKOT SATTA KING CHART 2026", isActive: false },
        { name: "BHADRA BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "ANMOL BAZAR SATTA KING CHART 2026", isActive: false },
        { name: "SKY KING SATTA KING CHART 2026", isActive: false },
        { name: "MOHALI-7 SATTA KING CHART 2026", isActive: false },
        { name: "UDAIPUR CITY SATTA KING CHART 2026", isActive: false },
    ];

    return (
        <div className="w-full bg-white pb-8 font-sans select-none">

<div className="bg-black py-6">
    <p className="text-base sm:text-lg text-center text-white">
A7satta provides all kind of satta king results everyday.

    </p>

</div>
            {/* Top Main Heading Banner with exact Orange-Yellow Gradient */}
            <div className="w-full bg-gradient-to-b from-[#FFA500] to-[#FFD200] py-6 text-center border-b border-black/10 mb-5">
                <h2 className="text-black font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide uppercase">
                    SATTA KING CHART 2026
                </h2>
            </div>

            {/* 3-Column Links Responsive Grid Container */}
            <div className="max-w-[98%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2 px-2">
                {charts.map((chart, idx) => (
                    <Link
                        key={idx}
                        href={`#${chart.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="
        w-full py-3 px-4 rounded text-center font-semibold text-xs sm:text-sm tracking-tight uppercase transition-all duration-150 border border-black/10
        bg-[#FFD200] text-black
        shadow-[2px_2px_0px_rgba(250,250,250,1)]
        hover:bg-black hover:text-[#FFD200]
        hover:brightness-100
        active:translate-y-[1px]
      "
                    >
                        {chart.name}
                    </Link>
                ))}
            </div>

        </div>
    );
}