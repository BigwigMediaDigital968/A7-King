export default function Footer(){
    return (
        <footer className="w-full bg-black py-10 border-t-4 border-black text-center text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="max-w-7xl mx-auto  flex justify-center gap-6 text-xs sm:text-sm font-bold capitalize">
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
          <div className="text-[10px] bg-secondary text-xs sm:text-sm text-black  font-bold w-full py-4 capitalize">
           <span className="text-neutral-500"> ©</span> 2026 A7 Satta King All Rights Reserved.
          </div>
          <div className="text-[10px] sm:text-sm font-semibold text-secondary max-w-4xl leading-relaxed mt-6">
            Disclaimer: A7 SATTA KING OFFICIAL is an informational directory service. We do not operate gambling activities. Matka is subject to local state legislation regulations.
          </div>
          
        </div>
      </footer>
    )
}