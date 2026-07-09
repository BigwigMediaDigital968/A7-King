"use client";

import { FormEvent, useMemo, useState } from "react";

interface Area {
  _id?: string;
  name: string;
  slug: string;
  resultTime: string;

  isActive?: boolean;
}

interface AreaFormProps {
  initialData?: Area;
  onSuccess?: (area: Area) => void;
}

export default function AreaForm({
  initialData,
  onSuccess,
}: AreaFormProps) {
  const isEditMode = !!initialData?._id;

  const [name, setName] = useState(initialData?.name ?? "");
  const [resultTime, setResultTime] = useState(
  initialData?.resultTime ?? ""
);
  const [isActive, setIsActive] = useState(
    initialData?.isActive ?? true
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const title = useMemo(
    () => (isEditMode ? "Edit Satta" : "Add Satta"),
    [isEditMode]
  );

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const url = isEditMode
        ? `/api/areas/${initialData?._id}`
        : "/api/areas";

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug: generateSlug(name),
          isActive,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setMessage(
        isEditMode
          ? "Area updated successfully ✅"
          : "Area created successfully ✅"
      );

      if (!isEditMode) {
        setName("");
        setIsActive(true);
      }

      onSuccess?.(data.data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-neutral-900">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Area Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
            placeholder="Enter area name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Result Time
          </label>

          <input
            type="text"
            value={resultTime}
            onChange={(e) => setResultTime(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
            placeholder="10:23 PM"
          />
        </div>

        {isEditMode && (
          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />

            <label
              htmlFor="isActive"
              className="text-sm font-medium"
            >
              Active
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update Area"
            : "Create Area"}
        </button>

        {message && (
          <div className="rounded-lg bg-neutral-100 p-3 text-sm">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}