"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface SattaGame {
  _id?: string;
  name: string;
  slug: string;
  resultTime: string; // "HH:MM" 24-hr stored in DB
  isActive?: boolean;
}

interface SattaFormProps {
  initialData?: SattaGame;
  onSuccess?: (satta: SattaGame) => void;
}

// Convert 24-hr "HH:MM" to 12-hr parts { hour, minute, period }
function to12hr(time24: string): { hour: string; minute: string; period: "AM" | "PM" } {
  if (!time24 || !time24.includes(":")) return { hour: "10", minute: "00", period: "PM" };
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return { hour: String(h).padStart(2, "0"), minute: mStr, period };
}

// Convert 12-hr parts to 24-hr "HH:MM"
function to24hr(hour: string, minute: string, period: "AM" | "PM"): string {
  let h = parseInt(hour, 10);
  if (period === "AM" && h === 12) h = 0;
  else if (period === "PM" && h !== 12) h += 12;
  return `${String(h).padStart(2, "0")}:${minute}`;
}

function generateSlug(value: string): string {
  // Strip Devanagari / all non-ASCII, then build Latin slug
  const latinOnly = value
    .toLowerCase()
    .trim()
    .replace(/[^\x00-\x7F]/g, " ") // treat non-ASCII blocks as spaces
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (latinOnly.length >= 2) return latinOnly;

  // Fallback for pure Hindi names or very short results: stable unique slug
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 5);
  return `satta-${ts}-${rand}`;
}

export default function SattaForm({ initialData, onSuccess }: SattaFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData?._id;

  const [name, setName] = useState(initialData?.name ?? "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  // Time state in 12-hr parts
  const init12 = useMemo(() => to12hr(initialData?.resultTime ?? ""), [initialData?.resultTime]);
  const [timeHour, setTimeHour] = useState(init12.hour);
  const [timeMinute, setTimeMinute] = useState(init12.minute);
  const [timePeriod, setTimePeriod] = useState<"AM" | "PM">(init12.period);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const title = isEditMode ? "Edit Satta Game" : "Add New Satta Game";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validate hour (1-12) and minute (00-59)
    const h = parseInt(timeHour, 10);
    const m = parseInt(timeMinute, 10);
    if (isNaN(h) || h < 1 || h > 12) {
      setMessage({ type: "error", text: "Hour must be between 1 and 12" });
      setLoading(false);
      return;
    }
    if (isNaN(m) || m < 0 || m > 59) {
      setMessage({ type: "error", text: "Minute must be between 00 and 59" });
      setLoading(false);
      return;
    }

    const resultTime24 = to24hr(timeHour, timeMinute.padStart(2, "0"), timePeriod);

    try {
      const url = isEditMode ? `/api/satta/${initialData?._id}` : "/api/satta";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: generateSlug(name),
          resultTime: resultTime24,
          isActive,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Operation failed");

      setMessage({
        type: "success",
        text: isEditMode ? "Satta game updated successfully ✅" : "Satta game created successfully ✅",
      });

      if (!isEditMode) {
        setName("");
        setTimeHour("10");
        setTimeMinute("00");
        setTimePeriod("PM");
        setIsActive(true);
      }

      onSuccess?.(data.data);

      if (isEditMode) {
        setTimeout(() => router.push("/admin/game"), 1000);
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

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const previewTime = `${timeHour}:${timeMinute.padStart(2, "0")} ${timePeriod}`;
  const previewSlug = generateSlug(name);

  return (
    <div className="max-w-xl w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {isEditMode ? "Update the details of this Satta game." : "Fill in details to create a new Satta game."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Game Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. GALI SATTA KING"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
          />
          {name && (
            <p className="text-xs text-gray-400 mt-1.5">
              Slug:{" "}
              {/[a-zA-Z0-9]/.test(name) ? (
                <span className="text-gray-600 font-mono">{previewSlug}</span>
              ) : (
                <span className="text-amber-600 font-mono">
                  auto-generated (Hindi name detected)
                </span>
              )}
            </p>
          )}
        </div>

        {/* Result Time — IST 12-hour picker */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Result Time (IST) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            {/* Hour */}
            <select
              value={timeHour}
              onChange={(e) => setTimeHour(e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 bg-white cursor-pointer"
            >
              {hours.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <span className="text-xl font-bold text-gray-500 select-none">:</span>
            {/* Minute */}
            <select
              value={timeMinute.padStart(2, "0")}
              onChange={(e) => setTimeMinute(e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 bg-white cursor-pointer"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {/* AM / PM */}
            <div className="flex rounded-xl border border-gray-300 overflow-hidden">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTimePeriod(p)}
                  className={`px-4 py-3 text-sm font-semibold transition-colors ${
                    timePeriod === p
                      ? "bg-[#e11d48] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            Preview: <span className="text-gray-700 font-semibold">{previewTime}</span>{" "}
            <span className="text-gray-400">(IST)</span>
          </p>
        </div>

        {/* isActive Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-semibold text-gray-700">Active</p>
            <p className="text-xs text-gray-400 mt-0.5">Game will be visible on the website</p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
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

        {/* Submit Button */}
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
          ) : (
            isEditMode ? "Update Satta Game" : "Create Satta Game"
          )}
        </button>

        {/* Message */}
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
