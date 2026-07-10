"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContactForm from "@/app/admin/components/ContactForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ContactData {
  _id: string;
  name: string;
  whatsappNumber?: string;
  telegramLink?: string;
  email?: string;
  isActive: boolean;
}

export default function EditContactPage() {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/contact/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Contact not found");
        setContact(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contact");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  return (
    <div className="space-y-4">
      <Link
        href="/admin/contact"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft size={16} /> Back to Contact List
      </Link>

      {loading ? (
        <div className="flex items-center gap-3 py-10 text-gray-400">
          <svg className="animate-spin h-6 w-6 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Loading contact...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      ) : contact ? (
        <ContactForm initialData={contact} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
          Contact not found.
        </div>
      )}
    </div>
  );
}
