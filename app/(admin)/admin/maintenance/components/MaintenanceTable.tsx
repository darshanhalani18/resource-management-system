"use client";

import React from "react";

const maintenanceData = [
  { id: "EX-2940", name: "Excavator-01", type: "Routine", start: "Oct 24, 2023 09:00", end: "Oct 24, 2023 12:00", status: "Scheduled" },
  { id: "GN-0042", name: "Generator-B2", type: "Repair", start: "Oct 23, 2023 14:30", end: "Oct 23, 2023 18:00", status: "In Progress" },
  { id: "FL-8812", name: "Forklift-05", type: "Inspection", start: "Oct 22, 2023 08:00", end: "Oct 22, 2023 10:00", status: "Completed" },
  { id: "TR-4420", name: "Truck-TR4", type: "Routine", start: "Oct 25, 2023 11:00", end: "Oct 25, 2023 13:00", status: "Scheduled" },
];

export default function MaintenanceTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-[#cfdbe7]">
            <th className="px-6 py-4 text-sm font-semibold text-[#0d141b]">Resource</th>
            <th className="px-6 py-4 text-sm font-semibold text-[#0d141b]">Type</th>
            <th className="px-6 py-4 text-sm font-semibold text-[#0d141b]">Timing</th>
            <th className="px-6 py-4 text-sm font-semibold text-[#0d141b]">Status</th>
            <th className="px-6 py-4 text-sm font-semibold text-right text-[#0d141b]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#cfdbe7]">
          {maintenanceData.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/20 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0d141b]">{item.name}</span>
                  <span className="text-xs text-[#4c739a]">ID: {item.id}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col text-xs font-medium text-[#4c739a]">
                  <span>{item.start}</span>
                  <span className="text-[10px] opacity-70">to {item.end.split(' ')[2]}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-[#4c739a] hover:text-[#137fec] hover:bg-white rounded-lg shadow-sm">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </button>
                  <button className="p-1.5 text-[#137fec] hover:bg-white rounded-lg shadow-sm">
                    <span className="material-symbols-outlined text-lg">play_circle</span>
                  </button>
                  <button className="p-1.5 text-red-500 hover:bg-white rounded-lg shadow-sm">
                    <span className="material-symbols-outlined text-lg">cancel</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-[#cfdbe7] flex items-center justify-between text-xs text-[#4c739a] font-medium">
        <span>Showing 1 to 4 of 128 tasks</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-[#137fec] text-white rounded font-bold">1</button>
          <button className="px-3 py-1 hover:bg-white rounded border border-transparent hover:border-[#cfdbe7]">2</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Scheduled: "bg-blue-50 text-[#137fec] border-[#137fec]/20",
    "In Progress": "bg-amber-50 text-amber-600 border-amber-200",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };
  const dotStyles: any = {
    Scheduled: "bg-[#137fec]",
    "In Progress": "bg-amber-500 animate-pulse",
    Completed: "bg-emerald-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}></span>
      {status}
    </span>
  );
}