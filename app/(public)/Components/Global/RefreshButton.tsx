"use client";

import React from "react";

interface RefreshButtonProps {
  onRefresh?: () => void;
  label?: string;
  className?: string;
}

export default function RefreshButton({
  onRefresh,
  label = "Refresh",
  className = "",
}: RefreshButtonProps) {
  const handleClick = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-2 text-white font-extrabold text-xs sm:text-sm p-2 flex items-center gap-1.5 z-50 cursor-pointer ${className}`}
      aria-label={label}
      type="button"
    >
      <img src="/refresh.webp" alt="" className="h-[45px] text-[#00a2ed]" />

    </button>
    </>
  );
}