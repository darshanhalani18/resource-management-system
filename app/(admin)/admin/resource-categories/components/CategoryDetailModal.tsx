"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CategoryDetailModal({ category }: { category: any }) {
  const router = useRouter();

  const onClose = () => router.back();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-150 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="px-8 pt-8 pb-4">
          <h2 className="text-slate-900 tracking-tight text-[28px] font-black leading-tight">
            Category Information
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Viewing full details for this resource type.
          </p>
        </div>

        <div className="px-8 py-6 space-y-6">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Internal Database ID
            </label>
            <p className="text-lg font-mono text-slate-700 mt-1">
              #{category.id}
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Category Name
            </label>
            <p className="text-lg font-bold text-[#137fec] mt-1">
              {category.name}
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Description
            </label>
            <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-slate-600 leading-relaxed">
              {category.description || "No description provided."}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Created Date
            </label>
            <p className="text-slate-700 font-medium mt-1">
              {new Date(category.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Close Information
          </button>
        </div>
      </div>
    </div>
  );
}
