"use client";

import React, { useState, useEffect } from "react";
import LiveStatus from "./Components/Home/LiveStatus";
import CommunityLinks from "./Components/Home/CommunityLinks";
import KhaiwalGrid from "./Components/Home/KhaiwalGrid";
import SattaResultTable from "./Components/Home/SattaResultTable";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import FAQSection from "./Components/Home/FAQSection";
import Blogs from "./Components/Home/Blogs";
import SattaChartSearch from "./Components/Home/SattaChartSearch";
import WeeklyResultsSection from "./Components/Home/WeeklyResultsSection";
import CTA from "./Components/Home/CTA";

// Specific local games list
const TABLE_1_GAMES = [
  "SADAR BAZAR", "GWALIOR", "DELHI BAZAR", "DELHI MATKA", "SHRI GANESH",
  "AGRA", "FARIDABAD", "ALWAR", "GAZIABAD", "DWARKA", "GALI", "DISAWER"
];

const TABLE_2_GAMES = [
  "HR SATTA", "KKR CITY", "UJJALA SUPER", "MADHUPURI", "ANMOL BAZAR",
  "DELHI DARBAR", "KAROL BAGH", "NEW GANGA", "SKY KING", "FATEHABAD",
  "RAJ SHREE", "BHADRA BAZAR"
];

// Helper to generate mock chart data with correct games
const generateGridData = (year: number, month: string, gamesList: string[]) => {
  const daysInMonth = 31;
  const seed = `${year}-${month}-${gamesList[0]}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const seededRandom = (day: number, gameIdx: number) => {
    const x = Math.sin(hash + day * 17 + gameIdx * 41) * 9999;
    const num = Math.floor((x - Math.floor(x)) * 100);
    return num.toString().padStart(2, "0");
  };

  return gamesList.map((game, gameIdx) => {
    const results: string[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const currentYear = new Date().getFullYear();
      const currentMonthIdx = new Date().getMonth();
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const selectedMonthIdx = months.indexOf(month);
      const currentDay = new Date().getDate();

      // If in the future, show blank or hyphen
      if (year > currentYear || (year === currentYear && selectedMonthIdx > currentMonthIdx) || (year === currentYear && selectedMonthIdx === currentMonthIdx && day > currentDay)) {
        results.push("-");
      } else {
        results.push(seededRandom(day, gameIdx));
      }
    }
    return { game, results };
  });
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [table1Data, setTable1Data] = useState<any[]>([]);
  const [table2Data, setTable2Data] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const whatsappLink = "https://wa.me/919999988888?text=Hello%20Aysatta%20Official";
  const telegramLink = "https://t.me/aysatta_official";

  // Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update Data
  useEffect(() => {
    setTable1Data(generateGridData(selectedYear, selectedMonth, TABLE_1_GAMES));
    setTable2Data(generateGridData(selectedYear, selectedMonth, TABLE_2_GAMES));
  }, [selectedYear, selectedMonth]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans selection:bg-[#ffd200] selection:text-black">


      {/* 3. LIVE STATUS BLOCK (Black background) */}
      <LiveStatus currentTime={currentTime} />
      {/* 6. SATTA ANNOUNCEMENT HEADER BANNER */}

      <CommunityLinks />


      <KhaiwalGrid />

      <SattaResultTable />

      <CTA/>
      <main className="mx-auto pt-8 flex-grow w-full flex flex-col gap-10">


        {/* 8. DOUBLE HISTORIC RESULT CHART GRID */}
        <section id="charts" className="flex flex-col gap-6">

          {/* Header & Filter options */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">

            <div className="w-full bg-gradient-to-b from-orange-400 to-[#ffd200] border-t-2 border-b border-black py-4 pb-6 text-center">
              <h3 className="text-xl sm:text-xl font-semibold text-black tracking-wider uppercase">
                SATTA RECORD CHART 2026
              </h3>
            </div>

          </div>
          <SattaChartSearch />

          <WeeklyResultsSection />


        </section>
        {/* 9. SEO TEXT WITH SOLID YELLOW HEADER */}

        <FAQSection />


        {/* 10. A7 SATTA KING BLOG (Black background card blocks) */}
        <Blogs />

      </main>
      {/* 12. FLOATING BOTTOM RIGHT REFRESH BUTTON */}
      

    </div>
  );
}
