export default function Navbar() {
  return (
    <nav className="w-full bg-black py-4 px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="bg-white text-black font-extrabold text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] transition-all duration-150"
          >
            A7 SATTA KING 🏠
          </a>
          <a
            href="#charts"
            className="bg-[#ffd200] text-black font-extrabold text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] transition-all duration-150"
          >
            CHART
          </a>
          <a
            href="#contact"
            className="bg-[#ffd200] text-black font-extrabold text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] transition-all duration-150"
          >
            CONTACT
          </a>
          <a
            href="#login"
            className="bg-[#ffd200] text-black font-extrabold text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] transition-all duration-150"
          >
            LOGIN
          </a>
        </div>
        <div className="text-white text-[10px] sm:text-xs text-center md:text-right max-w-lg md:self-end font-medium opacity-90">
          A7 SATTA KING official website welcomes you. Get informed about satta king's history, rules, and valuable winning news daily.
        </div>
      </nav>

  );
}