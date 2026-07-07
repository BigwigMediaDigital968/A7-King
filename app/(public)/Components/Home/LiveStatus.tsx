export default function LiveStatus({ currentTime }: { currentTime: string }) {
    return (
        <>
            <section className="w-full bg-black py-10 px-4 text-center border-b-4 border-black text-white">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                    <div className="text-[#ffd200] text-lg sm:text-xl font-bold tracking-wider font-mono">
                        {currentTime || "July 4, 2026 5:59:50 PM"}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                    </h2>
                    <div>
                        <div className="hidden md:block text-3xl sm:text-4xl font-bold tracking-widest text-white mt-2 uppercase">
                            <div className="">
                                delhi bazar
                            </div>
                            <div className="mt-4 sm:mt-6">
                                26
                            </div>

                        </div>
                        <div className="hidden md:block text-3xl sm:text-4xl font-bold tracking-widest text-white mt-6 uppercase">
                            <div className="">
                                gwalior
                            </div>
                            <div className="mt-4 sm:mt-6">
                                16
                            </div>

                        </div>
                        <div className="text-3xl sm:text-4xl font-bold tracking-widest text-white mt-6 uppercase">
                            <div className="">
                                AGRA
                            </div>
                            {/* Animated red starburst WAIT badge */}
                            <div className="wait-starburst mt-6 mx-auto ">
                                <span>WAIT</span>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* 4. DISAWER RESULT PANEL (Yellow background) */}
            <section className="w-full bg-[#ffd200] border-b-4 border-black py-8 text-center text-black">
                <div className="max-w-md mx-auto flex flex-col items-center">
                    <h3 className="text-3xl font-semibold tracking-tight">DISAWER</h3>
                    <span className="text-base font-bold text-black/80 mt-1 uppercase">5:15 AM</span>
                    <div className="flex items-center gap-4 mt-4  px-6 py-2.5 rounded-xl">
                        <span className="text-2xl font-mono font-black">39</span>
                        {/* Green arrow */}
                        <span className="w-8 h-8 bg-[#10b981] rounded flex items-center justify-center text-white text-lg font-black border border-black shadow-[1px_1px_0px_#000000]">
                            ➜
                        </span>
                        <span className="text-2xl font-mono font-black">91</span>
                    </div>
                </div>
            </section>
        </>
    )
}
