export default function Footer(){
    return (
        <footer className="w-full bg-black py-10 px-4 mt-12 border-t-4 border-black text-center text-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex justify-center gap-6 text-xs sm:text-sm font-black uppercase">
            <a
              href="#privacy"
              className="text-[#ffd200] hover:text-[#ffe033] underline"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-[#ffd200] hover:text-[#ffe033] underline"
            >
              Terms & Conditions
            </a>
          </div>
          <div className="text-[10px] sm:text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Disclaimer: A7 SATTA KING OFFICIAL is an informational directory service. We do not operate gambling activities. Matka is subject to local state legislation regulations.
          </div>
          <div className="text-[10px] sm:text-xs text-neutral-500 font-bold border-t border-neutral-900 w-full pt-4">
            © 2026 A7 SATTA KING OFFICIAL. All Rights Reserved.
          </div>
        </div>
      </footer>
    )
}