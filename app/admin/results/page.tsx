"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ISatta } from "@/app/types/Satta";
import { IResult } from "@/app/types/Results";
import { PlusCircle, Pencil, Trash2, Search, RefreshCw, Filter } from "lucide-react";
import Link from "next/link";

function formatTime12(time24: string): string {
  if (!time24) return "-";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${period}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Result with populated sattaId
interface PopulatedResult extends Omit<IResult, "sattaId"> {
  _id: string;
  sattaId: ISatta;
}

export default function ResultListPage() {
  const router = useRouter();
  const [results, setResults] = useState<PopulatedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [deleteTarget, setDeleteTarget] = useState<PopulatedResult | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/results");
      const data = await res.json();
      if (data.success) setResults(data.data);
    } catch {
      showToast("error", "Failed to load results");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/results/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResults((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      showToast("success", "Result deleted successfully");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = results.filter((r) => {
    const gameName = typeof r.sattaId === "object" ? r.sattaId.name : "";
    const matchSearch =
      gameName.toLowerCase().includes(search.toLowerCase()) ||
      r.result.includes(search);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    all: results.length,
    draft: results.filter((r) => r.status === "draft").length,
    published: results.filter((r) => r.status === "published").length,
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.text}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Satta Results</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all results — add, publish, edit, or delete entries.
          </p>
        </div>
        <Link
          href="/admin/results/new"
          className="inline-flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <PlusCircle size={16} />
          Add New Result
        </Link>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by game or result..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
          />
        </div>

        {/* Status Filter */}
        <div className="flex rounded-xl border border-gray-300 overflow-hidden text-sm">
          {(["all", "draft", "published"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2.5 font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-[#1f2937] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s}{" "}
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                statusFilter === s ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {statusCounts[s]}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={fetchResults}
          className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors text-gray-500"
          title="Refresh"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <svg className="animate-spin h-8 w-8 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm">Loading results...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">
              {search || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Add your first result."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Game</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Draw Date</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r, idx) => {
                  const game = typeof r.sattaId === "object" ? r.sattaId : null;
                  return (
                    <tr key={r._id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">{game?.name ?? "—"}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {game ? formatTime12(game.resultTime) : ""}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(r.drawDate)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block text-2xl font-black text-[#e11d48] tracking-widest font-mono">
                          {r.result}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            r.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              r.status === "published" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          />
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            r.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${r.isActive ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          {r.isActive ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => router.push(`/admin/results/${r._id}/edit`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Pencil size={12} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(r)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Delete Result?</h3>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 space-y-1">
              <p>Game: <span className="font-semibold">{(deleteTarget.sattaId as ISatta)?.name}</span></p>
              <p>Date: <span className="font-semibold">{formatDate(deleteTarget.drawDate)}</span></p>
              <p>Result: <span className="font-bold text-[#e11d48] font-mono text-lg">{deleteTarget.result}</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Deleting...</>
                ) : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
