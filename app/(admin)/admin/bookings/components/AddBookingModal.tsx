"use client";

import React from "react";

interface Props {
  onClose: () => void;
}

export default function AddBookingModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl">
              <span className="material-symbols-outlined text-[#137fec]">event_available</span>
            </div>
            <h2 className="text-slate-900 text-2xl font-black tracking-tight">New Booking</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-full transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Resource</label>
            <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all cursor-pointer appearance-none font-medium text-slate-700">
              <option value="">Select a resource...</option>
              <option value="conf-a">Conference Room A - 12th Floor</option>
              <option value="proj-1">Portable Projector (Unit 01)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Start Date & Time</label>
              <input type="datetime-local" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700" />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">End Date & Time</label>
              <input type="datetime-local" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Purpose / Notes</label>
            <textarea 
              className="w-full min-h-[100px] rounded-xl border border-gray-200 bg-gray-50 p-4 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700 resize-none placeholder:text-slate-300"
              placeholder="Briefly describe the purpose of this booking."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#137fec] text-white font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95">
            Create Booking
          </button>
        </div>
      </div>
    </div>
  );
}