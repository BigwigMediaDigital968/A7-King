import { Suspense } from "react";
import SattaYearlyChart from "../Components/Charts/SattaYearlyChart";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-white py-20 text-center font-sans">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FFA500] border-t-transparent"></div>
          <p className="mt-4 text-black font-bold text-sm">Loading chart...</p>
        </div>
      }
    >
      <SattaYearlyChart />
    </Suspense>
  )
}