"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ResultForm from "../../../components/ResultForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditResultPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/results/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Not found");

        // Normalize: sattaId can be populated object, we need the string id
        const raw = data.data;
        setResult({
          ...raw,
          sattaId: typeof raw.sattaId === "object" ? raw.sattaId._id : raw.sattaId,
          drawDate: raw.drawDate?.substring(0, 10) ?? "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load result");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResult();
  }, [id]);

  return (
    <div className="space-y-4">
      <Link
        href="/admin/results"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft size={16} /> Back to All Results
      </Link>

      {loading ? (
        <div className="flex items-center gap-3 py-10 text-gray-400">
          <svg className="animate-spin h-6 w-6 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Loading result...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <ResultForm initialData={result} />
      )}
    </div>
  );
}
