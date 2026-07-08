'sue clent';
import { getKhaiwalTimings, KhaiwalTiming } from "@/app/lib/khaiwal";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function KhaiwalGrid() {
  const [timings, setTimings] = useState<KhaiwalTiming[]>([]);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const data = await getKhaiwalTimings();
        setTimings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimings();
  }, []);
  const timingsData1And2 = timings;

  const timingsData4 = timings;

  return (
    <div className="w-full py-4 font-sans select-none">
      <div className="w-full max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">

        {/* COLUMN 1: AJAY BHAI KHAIWAL */}
        <div className="w-full bg-gradient-to-b from-[#ffd200] via-[#ffd200] to-white border-2 border-dashed border-red-600 rounded-2xl p-4 text-center flex flex-col items-center">
          <div>
            <span className="block text-black font-black text-xs tracking-tight mb-1">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
            <h3 className="text-black font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-1">
              🎰 AJAY BHAI KHAIWAL 🎰
            </h3>

            <div className="mt-4 space-y-1.5 w-full text-left px-2">
              {timingsData1And2.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-black text-black">
                  <span>⏰ {item.location}</span>
                  <span className="text-gray-500 font-bold flex-1 border-b border-dotted border-black/40 mx-1 mb-1"></span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-5 flex flex-col items-center gap-2">
            <span className="text-black font-black text-xs sm:text-sm">🤪 🤪 AJAY BHAI KHAIWAL 🤪 🤪</span>
            <a href="https://wa.me/your_link" className="text-blue-800 font-black text-xs sm:text-sm underline hover:text-blue-900 mb-1">
              Game play करने के लिये नीचे लिंक पर क्लिक करे
            </a>
            <WhatsAppButton />
          </div>
        </div>

        {/* COLUMN 2: JASSI BHAI KHAIWAL */}
        <div className="w-full bg-gradient-to-b from-[#ffd200] via-[#ffd200] to-white border-2 border-dashed border-red-600 rounded-2xl p-4 text-center flex flex-col items-center justify-between">
          <div>
            <span className="block text-black font-black text-xs tracking-tight mb-1">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
            <h3 className="text-black font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-1">
              🎰 JASSI BHAI KHAIWAL 🎰
            </h3>

            <div className="mt-4 space-y-1.5 w-full text-left px-2">
              {timingsData1And2.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-black text-black">
                  <span>⏰ {item.location}</span>
                  <span className="text-gray-500 font-bold flex-1 border-b border-dotted border-black/40 mx-1 mb-1"></span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-5 flex flex-col items-center gap-2">
            <span className="text-black font-black text-xs sm:text-sm">🤪 🤪 JASSI BHAI KHAIWAL 🤪 🤪</span>
            <a href="https://wa.me/your_link" className="text-blue-800 font-black text-xs sm:text-sm underline hover:text-blue-900 mb-1">
              Game play करने के लिये नीचे लिंक पर क्लिक करे
            </a>
            <WhatsAppButton />
          </div>
        </div>

        {/* COLUMN 3: CRICKET ID INFO */}
        <div className="w-full bg-gradient-to-b from-[#ffd200] via-[#ffd200] to-white border-2 border-dashed border-red-600 rounded-2xl p-4 text-center flex flex-col items-center justify-center justify-self-center">
          <p className="text-black font-black text-xs sm:text-sm leading-relaxed max-w-xs">
            नमस्कार साथियों Cricket <span className="bg-purple-600 text-white px-1 py-0.5 rounded text-[10px]">ID</span> लेने वाले भाई नीचे दिए गए लिंक पर क्लिक करे
          </p>

          <div className="flex gap-0.5 my-3 text-emerald-600 font-black text-sm">
            ✳️✳️✳️✳️✳️✳️✳️✳️✳️✳️
          </div>

          <span className="text-black font-black text-xs sm:text-sm uppercase tracking-wide">
            minimum <span className="bg-purple-600 text-white px-1 py-0.5 rounded text-[10px]">ID</span> 500₹ maximum no limit
          </span>

          <div className="mt-5 text-left bg-white/40 p-3 rounded-xl border border-black/10 max-w-xs">
            <p className="text-black font-black text-xs leading-relaxed">
              <span className="font-black text-red-600 underline">Note</span> 👉 इस नंबर पर सिर्फ क्रिकेट खेलने वाले ही msg करे फालतू के msg करने वाला ब्लॉक कर दिया जाएगा
            </p>
          </div>

          <div className="mt-6">
            <WhatsAppButton />
          </div>
        </div>

        {/* COLUMN 4: RAMAN BHAI KHAIWAL */}
        <div className="w-full bg-gradient-to-b from-[#ffd200] via-[#ffd200] to-white border-2 border-dashed border-red-600 rounded-2xl p-4 text-center flex flex-col items-center justify-between">
          <div>
            <span className="block text-black font-black text-xs tracking-tight mb-1">--सीधे सट्टा कंपनी का No 1 खाईवाल--</span>
            <h3 className="text-black font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-1">
              🎰 RAMAN BHAI KHAIWAL 🎰
            </h3>

            <div className="mt-4 space-y-1.5 w-full text-left px-2">
              {timingsData4.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-black text-black">
                  <span>⏰ {item.location}</span>
                  <span className="text-gray-500 font-bold flex-1 border-b border-dotted border-black/40 mx-1 mb-1"></span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-5 flex flex-col items-center gap-2">
            <span className="text-black font-black text-xs sm:text-sm">🤪 🤪 RAMAN BHAI KHAIWAL 🤪 🤪</span>
            <a href="https://wa.me/your_link" className="text-blue-800 font-black text-xs sm:text-sm underline hover:text-blue-900 mb-1">
              Game play करने के लिये नीचे लिंक पर क्लिक करे
            </a>
            <WhatsAppButton />
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Exact WhatsApp Button Layout Component
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/your_number"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 text-white "
    >
      {/* WhatsApp Pill Icon Wrapper */}
      <img src="/whatsapp-btn.png" alt="" className="h-[65px] text-[#00a2ed]" />

    </a>
  );
}