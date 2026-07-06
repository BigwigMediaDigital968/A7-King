"use client";

import React, { useState, useEffect } from "react";

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

      {/* 1. NAV HEADER BAR (Black background, golden pills) */}
      

      {/* 2. MAIN BRAND HEADER (Yellow background, big title) */}
      <header className="w-full bg-[#ffd200] border-b-4 border-black py-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-black uppercase">
          A7 SATTA KING OFFICIAL
        </h1>
      </header>

      {/* 3. LIVE STATUS BLOCK (Black background) */}
      <section className="w-full bg-black py-10 px-4 text-center border-b-4 border-black text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="text-[#ffd200] text-lg sm:text-xl font-bold tracking-wider font-mono">
            {currentTime || "July 4, 2026 5:59:50 PM"}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            हा भाई यही आती हे सबसे पहले खबर रूको और देखो
          </h2>
          <div className="text-4xl sm:text-5xl font-black tracking-widest text-white mt-2 uppercase">
            AGRA
          </div>

          {/* Animated red starburst WAIT badge */}
          <div className="wait-starburst mt-2">
            <span>WAIT</span>
          </div>
        </div>
      </section>

      {/* 4. DISAWER RESULT PANEL (Yellow background) */}
      <section className="w-full bg-[#ffd200] border-b-4 border-black py-8 text-center text-black">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <h3 className="text-3xl font-black tracking-tight">DISAWER</h3>
          <span className="text-sm font-bold text-black/80 mt-1 uppercase">5:15 AM</span>
          <div className="flex items-center gap-4 mt-4 bg-white border-2 border-black px-6 py-2.5 rounded-xl shadow-[4px_4px_0px_#000000]">
            <span className="text-2xl font-mono font-black">39</span>
            {/* Green arrow */}
            <span className="w-8 h-8 bg-[#10b981] rounded flex items-center justify-center text-white text-lg font-black border border-black shadow-[1px_1px_0px_#000000]">
              ➜
            </span>
            <span className="text-2xl font-mono font-black">91</span>
          </div>
        </div>
      </section>

      {/* 5. RED DASHED INFORMATION MARQUEE */}
      <div className="w-full bg-[#ffd200] border-b-4 border-black py-2.5 px-4 overflow-hidden relative">
        <div className="whitespace-nowrap flex gap-12 text-center text-xs font-black uppercase text-black">
          <span className="animate-marquee inline-block">
            "NOW TELEGRAM PLAYERS CAN ALSO JOIN OUR TELEGRAM CHANNEL TO GET RESULTS QUICKLY AND RECEIVE SUPERFAST RESULTS."
          </span>
          <span className="animate-marquee inline-block">
            "NOW TELEGRAM PLAYERS CAN ALSO JOIN OUR TELEGRAM CHANNEL TO GET RESULTS QUICKLY AND RECEIVE SUPERFAST RESULTS."
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full flex flex-col gap-10">

        {/* 6. SATTA ANNOUNCEMENT HEADER BANNER */}
        <section className="w-full flex flex-col items-center text-center gap-2 border-4 border-black bg-white py-4 px-6 shadow-[5px_5px_0px_#000000] -mt-2">
          <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
            ★ SHRI GANESH SATTA KING RESULT IS UPDATED EVERYDAY AT 4:40 PM. ★
          </span>
          <div className="w-full h-0.5 bg-black/10 my-1"></div>
          <span className="text-xs sm:text-sm font-black text-indigo-700 uppercase tracking-wider">
            SADAR BAZAR SATTA KING 2025 CHART IS AVAILABLE ON A7 SATTA KING.COM
          </span>
        </section>

        {/* 7. KHAIWAL CONTACTS (Dashed red outline cards) */}
        <section id="contact" className="flex flex-col gap-6">
          <h3 className="text-2xl font-black uppercase tracking-tight border-b-4 border-black pb-2">
            Direct Khaiwal Booking Center
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1: Ajay Bhai */}
            <div className="bg-[#ffd200] rounded-xl border-4 border-dashed border-red-600 p-5 flex flex-col items-center justify-between text-center shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000]">
              <div className="w-full">
                <span className="text-xs font-black uppercase tracking-tight block text-black/80">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
                <span className="text-base sm:text-lg font-black text-black block mt-2 mb-3 bg-white border-2 border-black py-1 px-3 rounded shadow-[2px_2px_0px_#000000]">
                  👑 AJAY BHAI KHAIWAL 👑
                </span>

                {/* Timings List */}
                <div className="text-[11px] font-bold text-left flex flex-col gap-1.5 border-t-2 border-black/20 pt-3">
                  <div>🕒 सदर बाजार ---------- 1:30 pm</div>
                  <div>🕒 ग्वालियर ---------- 2:30 pm</div>
                  <div>🕒 दिल्ली बाजार -------- 2:50 pm</div>
                  <div>🕒 दिल्ली मटका -------- 3:20 pm</div>
                  <div>🕒 श्री गणेश ---------- 4:20 pm</div>
                  <div>🕒 आगरा ------------ 5:20 pm</div>
                  <div>🕒 फरीदाबाद ---------- 5:50 pm</div>
                  <div>🕒 अलवर ------------ 7:20 pm</div>
                  <div>🕒 गाज़ियाबाद ---------- 8:50 pm</div>
                  <div>🕒 द्वारका ------------ 10:10 pm</div>
                  <div>🕒 गली ------------- 11:20 pm</div>
                  <div>🕒 दिसावर ----------- 1:30 Am</div>
                </div>
              </div>

              <div className="w-full mt-4 border-t-2 border-black/20 pt-4 flex flex-col items-center gap-3">
                <span className="text-[10px] font-black uppercase text-black/80">😆 😆 AJAY BHAI KHAIWAL 😆 😆</span>
                <span className="text-[11px] font-bold text-black">Game play करने के लिये नीचे लिंक पर क्लिक करे</span>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white border-2 border-black font-extrabold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.035-4.575l.395.235c1.558.927 3.327 1.417 5.127 1.417 5.485 0 9.948-4.614 9.952-10.279 0-2.748-1.07-5.328-3.013-7.27C16.623 1.81 14.053.743 11.3 0.74c-5.484 0-9.947 4.613-9.95 10.279 0 2.015.525 3.99 1.52 5.728l.247.428-1.0 3.655 3.774-.988zm12.39-7.39c-.282-.14-.1.666-.35-.783-.243-.448-.836-.63-.98-.666-.145-.037-.25-.056-.354.1-.105.158-.407.513-.5.626-.092.112-.184.126-.466-.015-.282-.14-1.19-.44-2.268-1.403-.84-.75-1.406-1.677-1.57-1.957-.164-.282-.017-.434.124-.573.127-.125.282-.328.423-.492.14-.165.188-.282.282-.47.094-.188.047-.353-.024-.493-.07-.14-.627-1.513-.86-2.072-.225-.544-.453-.47-.624-.478-.162-.008-.348-.01-.534-.01-.186 0-.488.07-.744.348-.256.28-1.023 1.002-1.023 2.445 0 1.442 1.047 2.837 1.193 3.033.146.196 2.06 3.146 4.992 4.414.697.302 1.24.483 1.665.617.7.223 1.338.192 1.843.117.563-.084 1.73-.707 1.976-1.39.245-.683.245-1.27.172-1.393-.073-.122-.268-.192-.55-.332z" /></svg>
                  WhatsApp Click to chat
                </a>
              </div>
            </div>

            {/* Card 2: Jassi Bhai */}
            <div className="bg-[#ffd200] rounded-xl border-4 border-dashed border-red-600 p-5 flex flex-col items-center justify-between text-center shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000]">
              <div className="w-full">
                <span className="text-xs font-black uppercase tracking-tight block text-black/80">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
                <span className="text-base sm:text-lg font-black text-black block mt-2 mb-3 bg-white border-2 border-black py-1 px-3 rounded shadow-[2px_2px_0px_#000000]">
                  👑 JASSI BHAI KHAIWAL 👑
                </span>

                {/* Timings List */}
                <div className="text-[11px] font-bold text-left flex flex-col gap-1.5 border-t-2 border-black/20 pt-3">
                  <div>🕒 सदर बाजार ---------- 1:30 pm</div>
                  <div>🕒 ग्वालियर ---------- 2:30 pm</div>
                  <div>🕒 दिल्ली बाजार -------- 2:50 pm</div>
                  <div>🕒 दिल्ली मटका -------- 3:20 pm</div>
                  <div>🕒 श्री गणेश ---------- 4:20 pm</div>
                  <div>🕒 आगरा ------------ 5:20 pm</div>
                  <div>🕒 फरीदाबाद ---------- 5:50 pm</div>
                  <div>🕒 अलवर ------------ 7:20 pm</div>
                  <div>🕒 गाज़ियाबाद ---------- 8:50 pm</div>
                  <div>🕒 द्वारका ------------ 10:10 pm</div>
                  <div>🕒 गली ------------- 11:20 pm</div>
                  <div>🕒 दिसावर ----------- 1:30 Am</div>
                </div>
              </div>

              <div className="w-full mt-4 border-t-2 border-black/20 pt-4 flex flex-col items-center gap-3">
                <span className="text-[10px] font-black uppercase text-black/80">👑 👑 JASSI BHAI KHAIWAL 👑 👑</span>
                <span className="text-[11px] font-bold text-black">Game play करने के लिये नीचे लिंक पर क्लिक करे</span>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white border-2 border-black font-extrabold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.035-4.575l.395.235c1.558.927 3.327 1.417 5.127 1.417 5.485 0 9.948-4.614 9.952-10.279 0-2.748-1.07-5.328-3.013-7.27C16.623 1.81 14.053.743 11.3 0.74c-5.484 0-9.947 4.613-9.95 10.279 0 2.015.525 3.99 1.52 5.728l.247.428-1.0 3.655 3.774-.988zm12.39-7.39c-.282-.14-.1.666-.35-.783-.243-.448-.836-.63-.98-.666-.145-.037-.25-.056-.354.1-.105.158-.407.513-.5.626-.092.112-.184.126-.466-.015-.282-.14-1.19-.44-2.268-1.403-.84-.75-1.406-1.677-1.57-1.957-.164-.282-.017-.434.124-.573.127-.125.282-.328.423-.492.14-.165.188-.282.282-.47.094-.188.047-.353-.024-.493-.07-.14-.627-1.513-.86-2.072-.225-.544-.453-.47-.624-.478-.162-.008-.348-.01-.534-.01-.186 0-.488.07-.744.348-.256.28-1.023 1.002-1.023 2.445 0 1.442 1.047 2.837 1.193 3.033.146.196 2.06 3.146 4.992 4.414.697.302 1.24.483 1.665.617.7.223 1.338.192 1.843.117.563-.084 1.73-.707 1.976-1.39.245-.683.245-1.27.172-1.393-.073-.122-.268-.192-.55-.332z" /></svg>
                  WhatsApp Click to chat
                </a>
              </div>
            </div>

            {/* Card 3: Cricket Booking */}
            <div className="bg-[#ffd200] rounded-xl border-4 border-dashed border-red-600 p-5 flex flex-col items-center justify-between text-center shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000]">
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-black uppercase text-black/80">नमस्कार साथियों Cricket 🆃 लेने वाले भाई नीचे दिए गए लिंक पर क्लिक करे</span>

                <span className="text-[#e11d48] font-bold text-xs my-2 tracking-widest bg-white border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] block">
                  ✳️✳️✳️✳️✳️✳️✳️✳️✳️
                </span>

                <div className="bg-white border-2 border-black font-extrabold text-xs py-2 px-3 rounded shadow-[2px_2px_0px_#000000] uppercase my-2">
                  minimum 🆃 500₹ <br /> maximum no limit
                </div>

                <span className="text-[#e11d48] font-bold text-xs my-2 tracking-widest bg-white border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000] block">
                  ✳️✳️✳️✳️✳️✳️✳️✳️✳️
                </span>

                <p className="text-[10px] font-bold text-left leading-relaxed mt-2 text-black border-t border-black/20 pt-2.5">
                  <strong>Note 👉</strong> इस नंबर पर सिर्फ क्रिकेट खेलने वाले ही msg करे फालतू के msg करने वाला ब्लॉक कर दिया जाएगा
                </p>
              </div>

              <div className="w-full mt-4 pt-4 flex flex-col items-center gap-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white border-2 border-black font-extrabold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.035-4.575l.395.235c1.558.927 3.327 1.417 5.127 1.417 5.485 0 9.948-4.614 9.952-10.279 0-2.748-1.07-5.328-3.013-7.27C16.623 1.81 14.053.743 11.3 0.74c-5.484 0-9.947 4.613-9.95 10.279 0 2.015.525 3.99 1.52 5.728l.247.428-1.0 3.655 3.774-.988zm12.39-7.39c-.282-.14-.1.666-.35-.783-.243-.448-.836-.63-.98-.666-.145-.037-.25-.056-.354.1-.105.158-.407.513-.5.626-.092.112-.184.126-.466-.015-.282-.14-1.19-.44-2.268-1.403-.84-.75-1.406-1.677-1.57-1.957-.164-.282-.017-.434.124-.573.127-.125.282-.328.423-.492.14-.165.188-.282.282-.47.094-.188.047-.353-.024-.493-.07-.14-.627-1.513-.86-2.072-.225-.544-.453-.47-.624-.478-.162-.008-.348-.01-.534-.01-.186 0-.488.07-.744.348-.256.28-1.023 1.002-1.023 2.445 0 1.442 1.047 2.837 1.193 3.033.146.196 2.06 3.146 4.992 4.414.697.302 1.24.483 1.665.617.7.223 1.338.192 1.843.117.563-.084 1.73-.707 1.976-1.39.245-.683.245-1.27.172-1.393-.073-.122-.268-.192-.55-.332z" /></svg>
                  WhatsApp Click to chat
                </a>
              </div>
            </div>

            {/* Card 4: Raman Bhai */}
            <div className="bg-[#ffd200] rounded-xl border-4 border-dashed border-red-600 p-5 flex flex-col items-center justify-between text-center shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000]">
              <div className="w-full">
                <span className="text-xs font-black uppercase tracking-tight block text-black/80">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
                <span className="text-base sm:text-lg font-black text-black block mt-2 mb-3 bg-white border-2 border-black py-1 px-3 rounded shadow-[2px_2px_0px_#000000]">
                  👑 RAMAN BHAI KHAIWAL 👑
                </span>

                {/* Timings List */}
                <div className="text-[11px] font-bold text-left flex flex-col gap-1.5 border-t-2 border-black/20 pt-3">
                  <div>🕒 सदर बाजार ---------- 1:20 pm</div>
                  <div>🕒 ग्वालियर ---------- 2:20 pm</div>
                  <div>🕒 दिल्ली बाजार -------- 2:50 pm</div>
                  <div>🕒 दिल्ली मटका -------- 3:20 pm</div>
                  <div>🕒 श्री गणेश ---------- 4:20 pm</div>
                  <div>🕒 आगरा ------------ 5:20 pm</div>
                  <div>🕒 फरीदाबाद ---------- 5:50 pm</div>
                  <div>🕒 अलवर ------------ 7:20 pm</div>
                  <div>🕒 गाज़ियाबाद ---------- 9:15 pm</div>
                  <div>🕒 द्वारका ------------ 10:10 pm</div>
                  <div>🕒 गली ------------- 11:20 pm</div>
                  <div>🕒 दिसावर ----------- 1:30 Am</div>
                </div>
              </div>

              <div className="w-full mt-4 border-t-2 border-black/20 pt-4 flex flex-col items-center gap-3">
                <span className="text-[10px] font-black uppercase text-black/80">😆 😆 RAMAN BHAI KHAIWAL 😆 😆</span>
                <span className="text-[11px] font-bold text-black">Game play करने के लिये नीचे लिंक पर क्लिक करे</span>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white border-2 border-black font-extrabold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.035-4.575l.395.235c1.558.927 3.327 1.417 5.127 1.417 5.485 0 9.948-4.614 9.952-10.279 0-2.748-1.07-5.328-3.013-7.27C16.623 1.81 14.053.743 11.3 0.74c-5.484 0-9.947 4.613-9.95 10.279 0 2.015.525 3.99 1.52 5.728l.247.428-1.0 3.655 3.774-.988zm12.39-7.39c-.282-.14-.1.666-.35-.783-.243-.448-.836-.63-.98-.666-.145-.037-.25-.056-.354.1-.105.158-.407.513-.5.626-.092.112-.184.126-.466-.015-.282-.14-1.19-.44-2.268-1.403-.84-.75-1.406-1.677-1.57-1.957-.164-.282-.017-.434.124-.573.127-.125.282-.328.423-.492.14-.165.188-.282.282-.47.094-.188.047-.353-.024-.493-.07-.14-.627-1.513-.86-2.072-.225-.544-.453-.47-.624-.478-.162-.008-.348-.01-.534-.01-.186 0-.488.07-.744.348-.256.28-1.023 1.002-1.023 2.445 0 1.442 1.047 2.837 1.193 3.033.146.196 2.06 3.146 4.992 4.414.697.302 1.24.483 1.665.617.7.223 1.338.192 1.843.117.563-.084 1.73-.707 1.976-1.39.245-.683.245-1.27.172-1.393-.073-.122-.268-.192-.55-.332z" /></svg>
                  WhatsApp Click to chat
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 8. DOUBLE HISTORIC RESULT CHART GRID */}
        <section id="charts" className="flex flex-col gap-6">

          {/* Header & Filter options */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black pb-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Satta Results Archives
              </h2>
              <p className="text-xs text-black/70">Check past satta records dynamically</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-white border-2 border-black text-black text-xs font-black px-4 py-2 rounded-xl focus:outline-none shadow-[2px_2px_0px_#000000]"
                aria-label="Select Year"
              >
                <option value={2026}>2026</option>
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-white border-2 border-black text-black text-xs font-black px-4 py-2 rounded-xl focus:outline-none shadow-[2px_2px_0px_#000000]"
                aria-label="Select Month"
              >
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Filter game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-2 border-black text-black placeholder-black/50 text-xs font-black px-4 py-2 rounded-xl focus:outline-none shadow-[2px_2px_0px_#000000] w-full sm:w-auto"
                aria-label="Filter game"
              />
            </div>
          </div>

          {/* TABLE 1 SECTION */}
          <div className="flex flex-col gap-4 border-4 border-black rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000]">

            {/* Header banner */}
            <div className="w-full bg-gradient-to-r from-orange-400 to-[#ffd200] border-b-4 border-black py-4 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-black tracking-wider uppercase">
                SATTA RESULT CHART {selectedMonth.toUpperCase()} {selectedYear}
              </h3>
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-[#ffd200] text-black border-b-2 border-black text-xs font-extrabold uppercase">
                    <th className="py-3 px-4 w-32 sticky left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center">Date</th>
                    {TABLE_1_GAMES.map((game) => (
                      <th key={game} className="py-3 px-2 text-center border-r border-black/40 text-[10px] w-24">
                        {game}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/30 text-xs font-bold bg-white text-black">
                  {Array.from({ length: 4 }).map((_, dayIdx) => {
                    const dayStr = `${(dayIdx + 1).toString().padStart(2, "0")}-07`;
                    return (
                      <tr key={dayIdx} className="hover:bg-yellow-50 transition-colors border-b border-black/40">
                        <td className="py-3 px-4 font-black w-32 sticky left-0 z-20 bg-yellow-100 border-r-2 border-black text-center shadow-[2px_0_5px_rgba(0,0,0,0.1)] font-mono">
                          {dayStr}
                        </td>
                        {table1Data
                          .filter((row) => row.game.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((row, gameIdx) => {
                            const resVal = row.results[dayIdx] || "-";
                            return (
                              <td
                                key={gameIdx}
                                className="py-3 px-2 text-center border-r border-black/25 font-mono text-sm"
                              >
                                {resVal === "-" ? (
                                  <span className="text-black/35 font-bold">-</span>
                                ) : (
                                  <span className="font-extrabold">{resVal}</span>
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

          {/* TABLE 2 SECTION */}
          <div className="flex flex-col gap-4 border-4 border-black rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000]">

            {/* Scrollable table container */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-[#ffd200] text-black border-b-2 border-black text-xs font-extrabold uppercase">
                    <th className="py-3 px-4 w-32 sticky left-0 z-20 bg-[#ffd200] border-r-2 border-black text-center">Date</th>
                    {TABLE_2_GAMES.map((game) => (
                      <th key={game} className="py-3 px-2 text-center border-r border-black/40 text-[10px] w-24">
                        {game}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/30 text-xs font-bold bg-white text-black">
                  {Array.from({ length: 4 }).map((_, dayIdx) => {
                    const dayStr = `${(dayIdx + 1).toString().padStart(2, "0")}-07`;
                    return (
                      <tr key={dayIdx} className="hover:bg-yellow-50 transition-colors border-b border-black/40">
                        <td className="py-3 px-4 font-black w-32 sticky left-0 z-20 bg-yellow-100 border-r-2 border-black text-center shadow-[2px_0_5px_rgba(0,0,0,0.1)] font-mono">
                          {dayStr}
                        </td>
                        {table2Data
                          .filter((row) => row.game.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((row, gameIdx) => {
                            const resVal = row.results[dayIdx] || "-";
                            return (
                              <td
                                key={gameIdx}
                                className="py-3 px-2 text-center border-r border-black/25 font-mono text-sm"
                              >
                                {resVal === "-" ? (
                                  <span className="text-black/35 font-bold">-</span>
                                ) : (
                                  <span className="font-extrabold">{resVal}</span>
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

        </section>


        {/* 9. SEO TEXT WITH SOLID YELLOW HEADER */}
        <section className="flex flex-col gap-6 mt-4">

          <div className="w-full bg-[#ffd200] border-4 border-black py-4 text-center shadow-[3px_3px_0px_#000000]">
            <h4 className="text-xl sm:text-2xl font-black text-black uppercase tracking-wide">
              What is A7 SATTA KING ?
            </h4>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_#000000] text-sm leading-relaxed text-black font-semibold flex flex-col gap-4">
            <p>
              A7 SATTA KING official (a7 satta) is a web platform / website which is popular for publishing various satta king games results as they are announced. There are thousands of websites which shows satta results, but A7 SATTA KING is trusted for its superfast result updates directly from the official matka offices.
            </p>
            <p>
              Satta King represents a lottery numbers draw system where participants select indexes from 00 to 99. The random number drawings determine the lucky winner. With local charts for Agra, Sadar Bazar, Kalyan, and Gali, we ensure complete access to historical data files.
            </p>
          </div>

        </section>


        {/* 10. A7 SATTA KING BLOG (Black background card blocks) */}
        <section className="flex flex-col gap-6 mt-4">
          <div className="w-full bg-black border-b-4 border-black py-4 text-center text-white">
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-widest">
              A7 SATTA KING BLOG
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {/* Blog Post 1 */}
            <div className="border-4 border-black bg-white shadow-[5px_5px_0px_#000000] flex flex-col hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000000] transition-all">
              {/* Image box (grey) */}
              <div className="w-full aspect-video bg-slate-400 flex items-center justify-center text-slate-800 font-extrabold border-b-4 border-black p-4 text-center">
                What is Shri Ganesh Satta King ?
              </div>
              {/* Yellow title area */}
              <div className="bg-[#ffd200] p-4 flex-grow flex flex-col gap-2 text-black">
                <h5 className="font-black text-sm uppercase leading-snug">
                  What is Shri Ganesh Satta King ?
                </h5>
                <span className="text-[10px] font-bold text-black/70 uppercase">Posted on May 9</span>
                <div className="text-[10px] font-extrabold text-[#e11d48] uppercase tracking-tighter flex flex-wrap gap-1.5 mt-2">
                  <span>#shriganeshsattaking</span>
                  <span>#playbajar</span>
                  <span>#playbazaar</span>
                  <span>#sattaking</span>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="border-4 border-black bg-white shadow-[5px_5px_0px_#000000] flex flex-col hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-full aspect-video bg-slate-400 flex items-center justify-center text-slate-800 font-extrabold border-b-4 border-black p-4 text-center">
                How to Play Kalyan Matka Chart ?
              </div>
              <div className="bg-[#ffd200] p-4 flex-grow flex flex-col gap-2 text-black">
                <h5 className="font-black text-sm uppercase leading-snug">
                  How to Play Kalyan Matka Chart ?
                </h5>
                <span className="text-[10px] font-bold text-black/70 uppercase">Posted on May 10</span>
                <div className="text-[10px] font-extrabold text-[#e11d48] uppercase tracking-tighter flex flex-wrap gap-1.5 mt-2">
                  <span>#kalyanchart</span>
                  <span>#matkatips</span>
                  <span>#playbajar</span>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="border-4 border-black bg-white shadow-[5px_5px_0px_#000000] flex flex-col hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div className="w-full aspect-video bg-slate-400 flex items-center justify-center text-slate-800 font-extrabold border-b-4 border-black p-4 text-center">
                Satta Gali Leak Jodi Calculation
              </div>
              <div className="bg-[#ffd200] p-4 flex-grow flex flex-col gap-2 text-black">
                <h5 className="font-black text-sm uppercase leading-snug">
                  Satta Gali Leak Jodi Calculation
                </h5>
                <span className="text-[10px] font-bold text-black/70 uppercase">Posted on May 12</span>
                <div className="text-[10px] font-extrabold text-[#e11d48] uppercase tracking-tighter flex flex-wrap gap-1.5 mt-2">
                  <span>#galileaknumber</span>
                  <span>#leakjodi</span>
                  <span>#sattakinggali</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      {/* 12. FLOATING BOTTOM RIGHT REFRESH BUTTON */}
      <button
        onClick={handleRefresh}
        className="fixed bottom-4 right-4 bg-black hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm py-2 px-5 rounded-full border-2 border-white shadow-[3px_3px_0px_#ffd200] flex items-center gap-1.5 z-50 transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ffd200]"
        aria-label="Refresh page"
      >
        Refresh 🔄
      </button>

    </div>
  );
}
