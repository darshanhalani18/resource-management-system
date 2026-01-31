"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function UserInfoModal({ user }: { user: any }) {
  const router = useRouter();
  const onClose = () => router.push("/admin/users");
  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // router.back() is the standard way to close an intercepted modal
    router.back();
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-150 border border-gray-100">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="px-8 pt-8 pb-4">
          <h2 className="text-slate-900 tracking-tight text-[28px] font-black leading-tight">
            User Profile
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Detailed account information and permissions.
          </p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="size-16 flex items-center justify-center rounded-full bg-[#137fec] text-white text-2xl font-black shadow-lg shadow-blue-100">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{user.name}</p>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                System Role
              </label>
              <p className="mt-1 text-sm font-bold text-[#137fec] uppercase tracking-tight">
                {user.roles.name}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Account Status
              </label>
              <p
                className={`mt-1 text-sm font-bold uppercase ${user.status === "ACTIVE" ? "text-emerald-600" : "text-rose-500"}`}
              >
                {user.status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Member Since
              </label>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Organization
              </label>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {user.organizations.name}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-2.5 rounded-xl bg-[#0d141b] text-white font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Close Information
          </button>
        </div>
      </div>
    </div>
  );
}
