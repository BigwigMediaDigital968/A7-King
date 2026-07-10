"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IContact } from "@/app/types/Contact";

interface ContactFormProps {
    initialData?: Partial<IContact>;
    onSuccess?: (contact: IContact) => void;
    onClose?: () => void;
}

export default function ContactForm({ initialData, onSuccess, onClose }: ContactFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData?._id;

    const [name, setName] = useState(initialData?.name ?? "");
    const [whatsappNumber, setWhatsappNumber] = useState(initialData?.whatsappNumber ?? "");
    const [telegramLink, setTelegramLink] = useState(initialData?.telegramLink ?? "");
    const [email, setEmail] = useState(initialData?.email ?? "");
    const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const title = isEditMode ? "Edit Contact Record" : "Add New Contact";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!name.trim()) {
            setMessage({ type: "error", text: "Name is required." });
            setLoading(false);
            return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setMessage({ type: "error", text: "Please enter a valid email address." });
            setLoading(false);
            return;
        }

        if (telegramLink && !/^https?:\/\//i.test(telegramLink.trim())) {
            setMessage({ type: "error", text: "Telegram link should start with http:// or https://." });
            setLoading(false);
            return;
        }

        if (whatsappNumber && !/^[+\d\s-]{6,20}$/.test(whatsappNumber.trim())) {
            setMessage({ type: "error", text: "Please enter a valid WhatsApp number." });
            setLoading(false);
            return;
        }

        try {
            const url = isEditMode ? `/api/contact/${initialData?._id}` : "/api/contact";
            const method = isEditMode ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    whatsappNumber: whatsappNumber.trim() || undefined,
                    telegramLink: telegramLink.trim() || undefined,
                    email: email.trim() || undefined,
                    isActive,
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Unable to save contact");

            setMessage({ type: "success", text: isEditMode ? "Contact updated successfully ✅" : "Contact added successfully ✅" });

            if (!isEditMode) {
                setName("");
                setWhatsappNumber("");
                setTelegramLink("");
                setEmail("");
                setIsActive(true);
            }

            onSuccess?.(data.data as IContact);

            if (isEditMode) {
                if (onClose) {
                    setTimeout(onClose, 800);
                } else {
                    setTimeout(() => router.push("/admin/contact"), 1000);
                }
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    const recordId = useMemo(() => initialData?._id, [initialData?._id]);

    return (
        <div className="max-w-md w-full"> {/* Tighter constraint layout block wrapper */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                    {isEditMode
                        ? "Update the contact record details."
                        : "Add a new contact record for WhatsApp, Telegram, or email."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-3.5">
                {recordId && (
                    <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                        <span className="font-semibold">Record ID:</span> {recordId}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Contact name"
                        className="w-full h-9 rounded-md border border-gray-300 px-3 text-xs outline-none transition focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48]/20 bg-gray-50/50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Number</label>
                    <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+91 99999 88888"
                        className="w-full h-9 rounded-md border border-gray-300 px-3 text-xs outline-none transition focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48]/20 bg-gray-50/50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Telegram Link</label>
                    <input
                        type="url"
                        value={telegramLink}
                        onChange={(e) => setTelegramLink(e.target.value)}
                        placeholder="https://t.me/yourchannel"
                        className="w-full h-9 rounded-md border border-gray-300 px-3 text-xs outline-none transition focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48]/20 bg-gray-50/50"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="w-full h-9 rounded-md border border-gray-300 px-3 text-xs outline-none transition focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48]/20 bg-gray-50/50"
                    />
                </div>

                {/* Toggle Switch Box Area */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div>
                        <p className="text-xs font-semibold text-gray-700">Active Status</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Visible live across references.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? "bg-[#e11d48]" : "bg-gray-300"
                            }`}
                    >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${isActive ? "translate-x-5" : "translate-x-0.5"
                            }`} />
                    </button>
                </div>

                {/* Action Submit Control button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-9 rounded-md bg-[#1f2937] px-4 text-xs font-semibold text-white transition hover:bg-[#374151] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span>{isEditMode ? "Updating..." : "Creating..."}</span>
                        </>
                    ) : isEditMode ? (
                        "Update Contact"
                    ) : (
                        "Create Contact"
                    )}
                </button>

                {message && (
                    <div
                        className={`rounded-md p-2.5 text-xs font-medium text-center ${message.type === "success"
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
