"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-8 flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="text-[#137fec] hidden sm:block">
            <span className="material-symbols-outlined text-[28px]">
              analytics
            </span>
          </div>
          <h2 className="text-[#0d141b] dark:text-white text-base md:text-lg font-bold tracking-tight truncate">
            Dashboard Overview
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search Input Area */}
        <div className="relative w-40 md:w-64 hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c739a] text-[20px]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-[#f0f2f5] dark:bg-slate-800 text-sm text-[#0d141b] dark:text-white placeholder-[#4c739a] focus:ring-2 focus:ring-[#137fec]/50 transition-all outline-none"
            placeholder="Search resources..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Notifications */}
          <button className="flex items-center justify-center rounded-lg h-9 w-9 md:h-10 md:w-10 bg-[#f0f2f5] dark:bg-slate-800 text-[#0d141b] dark:text-slate-300 hover:bg-[#137fec] hover:text-white transition-all">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">
              notifications
            </span>
          </button>

          {/* Settings */}
          <button className="flex items-center justify-center rounded-lg h-9 w-9 md:h-10 md:w-10 bg-[#f0f2f5] dark:bg-slate-800 text-[#0d141b] dark:text-slate-300 hover:bg-[#137fec] hover:text-white transition-all">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">
              settings
            </span>
          </button>

          {/* Login Button with specified design */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 h-9 md:h-10 rounded-lg bg-white dark:bg-slate-800 border border-[#137fec] text-[#137fec] text-sm font-bold hover:bg-[#137fec] hover:text-white transition-all shadow-sm ml-2 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span className="hidden md:inline">Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
