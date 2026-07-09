"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ISatta } from "@/app/types/Satta";

interface ResultData {
  _id?: string;
  sattaId: string;
  drawDate: string; // "YYYY-MM-DD"
  result: string;
  status: "draft" | "published";
  isActive: boolean;
}

interface ResultFormProps {
  initialData?: ResultData;
  onSuccess?: (result: ResultData) => void;
}

export default function ResultForm({ initialData, onSuccess }: ResultFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData?._id;

  const [games, setGames] = useState<ISatta[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);

  const [sattaId, setSattaId] = useState(initialData?.sattaId ?? "");
  const [drawDate, setDrawDate] = useState(
    initialData?.drawDate
      ? initialData.drawDate.substring(0, 10)
      : new Date().toISOString().substring(0, 10)
  );
  const [result, setResult] = useState(initialData?.result ?? "");
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status ?? "draft");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch all satta games for dropdown
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/satta");
        const data = await res.json();
        if (data.success) setGames(data.data);
      } catch {
        console.error("Failed to fetch games");
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleResultChange = (val: string) => {
    // Allow only up to 2 digits
    const cleaned = val.replace(/\D/g, "").slice(0, 2);
    setResult(cleaned);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!sattaId) {
      setMessage({ type: "error", text: "Please select a satta game" });
      setLoading(false);
      return;
    }

    if (!/^\d{2}$/.test(result)) {
      setMessage({ type: "error", text: "Result must be exactly 2 digits (e.g. 07, 42, 99)" });
      setLoading(false);
      return;
    }

    try {
      const url = isEditMode ? `/api/results/${initialData?._id}` : "/api/results";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sattaId, drawDate, result, status, isActive }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      setMessage({
        type: "success",
        text: isEditMode ? "Result updated successfully ✅" : "Result created successfully ✅",
      });

      if (!isEditMode) {
        setResult("");
        setStatus("draft");
        setIsActive(true);
      }

      onSuccess?.(data.data);

      if (isEditMode) {
        setTimeout(() => router.push("/admin/results"), 1000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to display time in IST 12-hr
  const formatTime = (time24: string) => {
    if (!time24) return "";
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr, 10);
    const period = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${mStr} ${period}`;
  };

  const selectedGame = games.find((g) => g._id === sattaId);

  return (
    <div className="max-w-xl w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Result" : "Add New Result"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isEditMode
            ? "Update the result details."
            : "Select a game and enter the result number."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
      >
        {/* Game Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Satta Game <span className="text-red-500">*</span>
          </label>
          {gamesLoading ? (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400 animate-pulse">
              Loading games...
            </div>
          ) : (
            <select
              value={sattaId}
              onChange={(e) => setSattaId(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 bg-white cursor-pointer"
            >
              <option value="">-- Select a game --</option>
              {games.map((game) => (
                <option key={game._id} value={game._id}>
                  {game.name} ({formatTime(game.resultTime)})
                </option>
              ))}
            </select>
          )}
          {selectedGame && (
            <p className="text-xs text-gray-400 mt-1.5">
              Result time:{" "}
              <span className="font-semibold text-gray-600">
                {formatTime(selectedGame.resultTime)} IST
              </span>
            </p>
          )}
        </div>

        {/* Draw Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Draw Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={drawDate}
            onChange={(e) => setDrawDate(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
          />
        </div>

        {/* Result Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Result Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={result}
              onChange={(e) => handleResultChange(e.target.value)}
              required
              placeholder="e.g. 07"
              maxLength={2}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-3xl font-bold tracking-widest outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              00–99
            </span>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
          <div className="flex gap-3">
            {(["draft", "published"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${
                  status === s
                    ? s === "published"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-400 bg-gray-100 text-gray-700"
                    : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                }`}
              >
                {s === "published" ? "✅ Published" : "📝 Draft"}
              </button>
            ))}
          </div>
        </div>

        {/* isActive Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-semibold text-gray-700">Active</p>
            <p className="text-xs text-gray-400 mt-0.5">Result will be visible on the website</p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isActive ? "bg-[#e11d48]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#1f2937] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#374151] disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {isEditMode ? "Updating..." : "Creating..."}
            </>
          ) : isEditMode ? (
            "Update Result"
          ) : (
            "Create Result"
          )}
        </button>

        {message && (
          <div
            className={`rounded-xl p-3 text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
