"use client";

import React from "react";

interface Props {
  onClose: () => void;
}

export default function AddResourceModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-slate-900 text-2xl font-black tracking-tight">Add New Resource</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content / Form */}
        <div className="overflow-y-auto p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Resource Name</label>
            <input 
              autoFocus
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] px-4 text-base font-medium outline-none transition-all placeholder:text-slate-300" 
              placeholder="Enter resource name..." 
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
              <select className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-base font-medium outline-none cursor-pointer appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#137fec]">
                <option value="">Select category...</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="space">Space</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
              <select className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-base font-medium outline-none cursor-pointer appearance-none focus:ring-4 focus:ring-blue-50 focus:border-[#137fec]">
                <option value="">Select location...</option>
                <option value="hq">Headquarters</option>
                <option value="remote">Remote</option>
                <option value="dc">Data Center</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Description (Optional)</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-base font-medium outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] resize-none transition-all placeholder:text-slate-300" 
              placeholder="Describe the resource features, usage, or notes..."
            />
          </div>

          {/* Info Note */}
          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl border border-dashed border-blue-200">
            <span className="material-symbols-outlined text-[#137fec] text-xl">info</span>
            <p className="text-[11px] text-slate-500 font-medium">
              Status for new resources is automatically set to <span className="font-black text-emerald-600 uppercase">Available</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-6 bg-gray-50/50 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 h-12 rounded-xl text-slate-400 font-bold hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 h-12 rounded-xl bg-[#137fec] text-white font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">save</span>
            Save Resource
          </button>
        </div>
      </div>
    </div>
  );
}