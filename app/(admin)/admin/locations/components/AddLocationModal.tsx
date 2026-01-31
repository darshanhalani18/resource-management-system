"use client";

import React from "react";

interface Props {
  onClose: () => void;
}

export default function AddLocationModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Location</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Define a new infrastructure node in the hierarchy.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-50 rounded-full transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-4 space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Location Name</label>
            <input 
              type="text" 
              placeholder="e.g. East Wing"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Parent Location</label>
            <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all cursor-pointer appearance-none font-medium text-slate-700">
              <option value="none">None - Root</option>
              <option value="hq">Headquarters</option>
              <option value="wh_a">Warehouse A</option>
              <option value="office_main">Main Office</option>
            </select>
            <p className="text-slate-400 text-[11px] mt-2 font-medium">
              Selecting 'None - Root' creates a top-level entry.
            </p>
          </div>

          {/* Preview Card */}
          <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#137fec] shadow-sm">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Hierarchy Preview</span>
                <span className="text-sm font-bold text-slate-700">Organization &gt; HQ &gt; New Location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-8 mt-4 bg-gray-50/50 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-400 font-bold text-sm hover:text-slate-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#137fec] text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
}