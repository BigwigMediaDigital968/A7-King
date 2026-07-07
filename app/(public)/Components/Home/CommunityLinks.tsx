import React from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function CommunityLinks() {
  return (
    <div className="w-full py-2 flex flex-col gap-4 font-sans select-none">
      <div className="w-full mx-auto flex flex-col gap-2">
        
        {/* TELEGRAM ROW */}
        <div className="w-full bg-[#ffd200] border border-dashed border-red-500  py-6 px-4 text-center flex flex-col items-center justify-center gap-3">
          <p className="text-black font-semibold text-sm sm:text-base uppercase tracking-tight max-w-5xl leading-relaxed">
            "NOW TELEGRAM PLAYERS CAN ALSO JOIN OUR TELEGRAM CHANNEL TO GET RESULTS QUICKLY AND RECEIVE SUPERFAST RESULTS."
          </p>
          <a
            href="https://t.me/your_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#00a2ed] text-white font-black text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-white transition-all duration-150"
          >
            {/* Telegram Pill Icon Wrapper */}
            <div className="bg-white rounded-full p-0.5 flex items-center justify-center text-[#00a2ed]">
              <FaTelegramPlane className="w-8 h-8 text-[#00a2ed]" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-sm font-black tracking-wide">Telegram</span>
              <span className="text-[9px] font-bold opacity-90">Click to connect</span>
            </div>
          </a>
        </div>

        {/* WHATSAPP ROW */}
        <div className="w-full bg-[#ffd200] border border-dashed border-red-500 py-6 px-4 text-center flex flex-col items-center justify-center gap-3">
          <p className="text-black font-semibold text-sm sm:text-base uppercase tracking-tight max-w-5xl leading-relaxed">
            "NOW WHATSAPP PLAYERS CAN ALSO JOIN OUR WHATSAPP CHANNEL TO GET RESULTS QUICKLY AND RECEIVE SUPERFAST RESULTS."
          </p>
          <a
            href="https://wa.me/your_number"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#00c600] text-white font-black text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-white shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] transition-all duration-150"
          >
            {/* WhatsApp Pill Icon Wrapper */}
            <div className="bg-white rounded-full p-0.5 flex items-center justify-center text-[#00c600]">
            <FaWhatsapp className="w-8 h-8 text-[#00c600]" />
            </div>

             <div className="flex flex-col items-start leading-none">
              <span className="text-sm font-black tracking-wide">WhatsApp</span>
              <span className="text-[9px] font-bold opacity-90">Click to chat</span>
            </div>
          </a>
        </div>

        {/* SHRI GANESH UPDATE TRACK */}
        <div className="w-full bg-[#ffd200] border border-dashed border-red-500 py-6 px-4 text-center">
          <p className="text-black font-semibold text-xs sm:text-sm md:text-base uppercase tracking-tight">
            <a href="#shri-ganesh" className="underline hover:text-zinc-800">SHRI GANESH SATTA KING</a> RESULT IS UPDATED EVERYDAY AT <span className="font-bold">4:40 PM</span>.
          </p>
        </div>

        {/* SADAR BAZAR UPDATE TRACK */}
        <div className="w-full bg-[#ffd200] border border-dashed border-red-500 py-6 px-4 text-center">
          <p className="text-black font-semibold text-xs sm:text-sm md:text-base uppercase tracking-tight">
            <a href="#sadar-bazar" className="underline hover:text-zinc-800">SADAR BAZAR SATTA KING 2025</a> CHART IS AVAILABLE ON A7SATTA.COM
          </p>
        </div>

      </div>
    </div>
  );
}