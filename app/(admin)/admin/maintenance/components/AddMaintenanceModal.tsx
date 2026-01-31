"use client";

import React from "react";

interface Props {
  onClose: () => void;
}

export default function AddMaintenanceModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[640px] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#cfdbe7] animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#0d141b] leading-tight">Schedule Maintenance</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-gray-50 rounded-full transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Resource</label>
            <select className="w-full h-12 px-4 rounded-lg border border-[#cfdbe7] bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all cursor-pointer appearance-none font-medium text-slate-700">
              <option value="">Select a resource...</option>
              <option value="ex-01">Excavator Cat 320 - Unit 01</option>
              <option value="tr-04">Haul Truck - Unit 04</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Maintenance Type</label>
            <select className="w-full h-12 px-4 rounded-lg border border-[#cfdbe7] bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all cursor-pointer appearance-none font-medium text-slate-700">
              <option value="routine">Routine</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Start Date & Time</label>
              <input type="datetime-local" className="w-full h-12 px-4 rounded-lg border border-[#cfdbe7] bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700" />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">End Date & Time</label>
              <input type="datetime-local" className="w-full h-12 px-4 rounded-lg border border-[#cfdbe7] bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Notes / Description</label>
            <textarea 
              className="w-full min-h-[100px] rounded-lg border border-[#cfdbe7] bg-gray-50 p-4 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] outline-none transition-all text-sm font-medium text-slate-700 resize-none placeholder:text-slate-300"
              placeholder="Describe the maintenance needed..."
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 h-11 rounded-lg text-slate-500 font-bold text-sm hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button className="px-6 h-11 rounded-lg bg-[#137fec] text-white font-bold text-sm shadow-md shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95">
            Schedule Maintenance
          </button>
        </div>
      </div>
    </div>
  );
}