"use client";

import React from "react";

interface NavbarProps {
  adminName: string;
}

export default function Navbar({ adminName }: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e7edf3] bg-white px-4 md:px-8 flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        <h2 className="text-[#0d141b] text-base md:text-lg font-bold tracking-tight truncate">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center gap-2 px-4 h-9 md:h-10 rounded-lg bg-[#137fec]/10 border border-[#137fec]/20 text-[#137fec] text-sm font-bold">
            <span className="material-symbols-outlined text-[18px]">
              waving_hand
            </span>
            <span className="hidden sm:inline">Hi, {adminName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
