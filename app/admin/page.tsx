"use client";

import { useQuery } from "@tanstack/react-query";
import { 
  Trophy, 
  Activity, 
  Layers, 
  PlusCircle, 
  Clock, 
  ArrowUpRight, 
  User, 
  Contact, 
  BarChart3 
} from "lucide-react";
import Link from "next/link";

interface SattaGame {
  _id: string;
  name: string;
  slug: string;
  resultTime: string;
  isActive: boolean;
  createdAt: string;
}

interface SattaResult {
  _id: string;
  sattaId: {
    _id: string;
    name: string;
    slug: string;
    resultTime: string;
  };
  drawDate: string;
  result: string;
  status: string;
  isActive: boolean;
}

function formatTime12(time24: string): string {
  if (!time24) return "-";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${period}`;
}

export default function AdminDashboardPage() {
  // Fetch Satta games from the API
  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: ["adminSattaGames"],
    queryFn: async () => {
      const res = await fetch("/api/satta");
      const json = await res.json();
      return (json.data || []) as SattaGame[];
    }
  });

  // Fetch Satta results from the API
  const { data: resultsData, isLoading: resultsLoading } = useQuery({
    queryKey: ["adminResults"],
    queryFn: async () => {
      const res = await fetch("/api/results");
      const json = await res.json();
      return (json.data || []) as SattaResult[];
    }
  });

  const totalGames = gamesData?.length || 0;
  const activeGames = gamesData?.filter((g) => g.isActive).length || 0;
  const totalResults = resultsData?.length || 0;

  const recentResults = resultsData?.slice(0, 5) || [];
  const recentGames = gamesData?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Control Panel</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Real-time metrics, quick actions, and status updates for A7 Satta.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Games */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Satta Games</p>
            <p className="text-3xl font-black text-gray-800">{gamesLoading ? "..." : totalGames}</p>
          </div>
          <div className="p-3 bg-red-50 text-[#e11d48] rounded-2xl">
            <Layers size={24} />
          </div>
        </div>

        {/* Card 2: Active Games */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Satta Games</p>
            <p className="text-3xl font-black text-green-600">{gamesLoading ? "..." : activeGames}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
            <Activity size={24} />
          </div>
        </div>

        {/* Card 3: Results Published */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Results Logged</p>
            <p className="text-3xl font-black text-blue-600">{resultsLoading ? "..." : totalResults}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Trophy size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Recent Results & Games (takes 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Results Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">Recent Results Log</h3>
              <Link href="/admin/results" className="text-xs font-semibold text-[#e11d48] hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={14} />
              </Link>
            </div>
            
            {resultsLoading ? (
              <div className="py-10 text-center text-gray-400 text-sm">Loading recent results...</div>
            ) : recentResults.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm">No results logged yet.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentResults.map((result) => (
                  <div key={result._id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 text-[#e11d48] rounded-xl font-mono text-lg font-black w-12 h-12 flex items-center justify-center">
                        {result.result}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{result.sattaId?.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> {formatTime12(result.sattaId?.resultTime)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {result.status}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1.5">
                        {new Date(result.drawDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Games Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">Recently Added Games</h3>
              <Link href="/admin/game" className="text-xs font-semibold text-[#e11d48] hover:underline flex items-center gap-0.5">
                Manage Games <ArrowUpRight size={14} />
              </Link>
            </div>
            
            {gamesLoading ? (
              <div className="py-10 text-center text-gray-400 text-sm">Loading games...</div>
            ) : recentGames.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm">No games added yet.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentGames.map((game) => (
                  <div key={game._id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{game.name}</p>
                      <code className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                        /{game.slug}
                      </code>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 font-mono">{formatTime12(game.resultTime)}</span>
                      <span className={`inline-flex h-2 w-2 rounded-full ${game.isActive ? "bg-green-500" : "bg-gray-300"}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions & Navigation */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs border-b border-gray-100 pb-2">Quick Actions</h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              <Link 
                href="/admin/game/new"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#e11d48]/5 hover:border-[#e11d48]/30 transition-all text-sm font-semibold text-gray-700 hover:text-[#e11d48]"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle size={16} /> Create Satta Game
                </span>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link 
                href="/admin/results/new"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#e11d48]/5 hover:border-[#e11d48]/30 transition-all text-sm font-semibold text-gray-700 hover:text-[#e11d48]"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle size={16} /> Add Game Result
                </span>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link 
                href="/admin/yearly-chart"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#e11d48]/5 hover:border-[#e11d48]/30 transition-all text-sm font-semibold text-gray-700 hover:text-[#e11d48]"
              >
                <span className="flex items-center gap-2">
                  <BarChart3 size={16} /> View Yearly Charts
                </span>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs border-b border-gray-100 pb-2">Support Shortcuts</h3>
            
            <div className="space-y-2">
              <Link 
                href="/admin/contact"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900"
              >
                <Contact size={18} className="text-gray-400" />
                <div>
                  <p className="font-semibold text-xs">Edit Contact Info</p>
                  <p className="text-[10px] text-gray-400">Telegram, WhatsApp, Email links</p>
                </div>
              </Link>

              <Link 
                href="/admin/#"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900"
              >
                <User size={18} className="text-gray-400" />
                <div>
                  <p className="font-semibold text-xs">Edit Khaiwal Timing</p>
                  <p className="text-[10px] text-gray-400">WhatsApp Khaiwal contacts & numbers</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}