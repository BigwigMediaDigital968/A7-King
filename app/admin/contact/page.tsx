"use client";

import { useEffect, useMemo, useState } from "react";
import { PlusCircle, Pencil, Trash2, Search, RefreshCw, X, Eye } from "lucide-react";
import { IContact } from "@/app/types/Contact";
import ContactForm from "@/app/admin/components/ContactForm";

export default function ContactListPage() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContact, setModalContact] = useState<IContact | null>(null);
  const [viewContact, setViewContact] = useState<IContact | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (res.ok && data.success) {
        setContacts(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openAddModal = () => {
    setModalContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact: IContact) => {
    setModalContact(contact);
    setIsModalOpen(true);
  };

  const openViewModal = (contact: IContact) => {
    setViewContact(contact);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContact(null);
  };

  const closeViewModal = () => {
    setViewContact(null);
  };

  const handleModalSuccess = (contact: IContact) => {
    if (modalContact) {
      setContacts((prev) => prev.map((item) => (item._id === contact._id ? contact : item)));
      showToast("success", "Contact updated successfully");
    } else {
      setContacts((prev) => [contact, ...prev]);
      showToast("success", "Contact added successfully");
    }
    closeModal();
  };

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return contacts;

    return contacts.filter((contact) => {
      return [
        contact.name,
        contact.email ?? "",
        contact.whatsappNumber ?? "",
        contact.telegramLink ?? "",
        contact.referenceId ?? "",
        contact._id,
      ]
        .some((value) => value?.toLowerCase().includes(query));
    });
  }, [contacts, search, modalContact]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this contact record? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Delete failed");
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      showToast("success", "Contact deleted successfully");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to delete contact");
    } finally {
      setDeletingId(null);
    }
  };
  console.log(contacts)

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage contact records for WhatsApp, Telegram, email and phone references.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <PlusCircle size={16} /> Add Contact
        </button>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-55 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, whatsapp, telegram, or ID"
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
          />
        </div>
        <button
          onClick={fetchContacts}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={16} className="mr-2" /> Refresh
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm">
          <span className="text-gray-500">Total records</span> <span className="font-semibold text-gray-800">{contacts.length}</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm">
          <span className="text-gray-500">Visible</span> <span className="font-semibold text-gray-800">{filteredContacts.length}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <ContactForm
                key={modalContact?._id ?? "new-contact"}
                initialData={modalContact ?? undefined}
                onSuccess={handleModalSuccess}
                onClose={closeModal}
              />
            </div>
          </div>
        </div>
      )}

      {viewContact && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={closeViewModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
              aria-label="Close details"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                  <p className="text-sm text-gray-500 mt-1">View full contact information and references.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Reference ID</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">{viewContact.referenceId || "—"}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Mongo ID</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900 break-all">{viewContact._id}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Name</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">{viewContact.name}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">WhatsApp</p>
                    <p className="mt-2 text-sm text-gray-900">{viewContact.whatsappNumber || "—"}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Telegram</p>
                    <p className="mt-2 text-sm text-gray-900 break-all">{viewContact.telegramLink || "—"}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                    <p className="mt-2 text-sm text-gray-900">{viewContact.email || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <svg className="animate-spin h-8 w-8 text-[#e11d48]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-lg font-medium">No contacts found</p>
            <p className="text-sm mt-1">Use the button above to add a new contact record.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Telegram</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((contact, index) => (
                  <tr key={contact._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4">
                      <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-mono">
                        {contact.referenceId}
                      </code>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800">{contact.name}</td>
                    <td className="px-5 py-4 text-gray-600">{contact.whatsappNumber || "—"}</td>
                    <td className="px-5 py-4 text-gray-600 break-all">{contact.telegramLink || "—"}</td>
                    <td className="px-5 py-4 text-gray-600">{contact.email || "—"}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        contact.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${contact.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                        {contact.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(contact)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye size={12} /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(contact)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          disabled={deletingId === contact._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-60"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
