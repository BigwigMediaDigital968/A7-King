import ResultForm from "../../components/ResultForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewResultPage() {
  return (
    <div className="space-y-4">
      <Link
        href="/admin/results"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft size={16} /> Back to All Results
      </Link>
      <ResultForm />
    </div>
  );
}
