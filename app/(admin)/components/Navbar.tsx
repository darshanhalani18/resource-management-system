"use client";

import React, { useState, useRef, useEffect } from "react";
import { logoutAction } from "@/app/actions/auth.actions";
import Link from "next/link";

interface NavbarProps {
  adminName: string;
  adminEmail: string;
}

export default function Navbar({ adminName, adminEmail }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e7edf3] bg-white px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h2 className="text-[#0d141b] text-lg font-bold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
             <span className="material-symbols-outlined">notifications</span>
           </button>
        </div>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
          >
            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-primary/20"
              style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${adminName}&background=137fec&color=fff")` }}
            />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-[#0d141b] flex items-center gap-1">
                Hi, {adminName.split(' ')[0]}
                <span className="material-symbols-outlined text-sm">{isMenuOpen ? 'expand_less' : 'expand_more'}</span>
              </p>
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100] animate-in fade-in slide-in-from-top-1">
              <div className="px-5 py-3 border-b border-slate-100 mb-2">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-[#0d141b] truncate">{adminEmail}</p>
              </div>

              <Link href="/admin/settings/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">person</span>
                <span className="text-sm font-semibold text-slate-700">My Profile</span>
              </Link>

              <Link href="/admin/settings/organization" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">corporate_fare</span>
                <span className="text-sm font-semibold text-slate-700">Organization Settings</span>
              </Link>

              <div className="border-t border-slate-100 mt-2 pt-2">
                <form action={logoutAction}>
                  <button type="submit" className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors group text-red-600">
                    <span className="material-symbols-outlined text-red-400 group-hover:text-red-600">logout</span>
                    <span className="text-sm font-bold">Logout</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}