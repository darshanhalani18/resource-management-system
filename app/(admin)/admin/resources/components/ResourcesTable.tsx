"use client";

import React from "react";

const resources = [
  { name: "Conference Room A", category: "Space", location: "Building 1, Floor 2", status: "Available", icon: "meeting_room" },
  { name: "Workstation 04", category: "Hardware", location: "Building 1, Floor 1", status: "Reserved", icon: "desktop_windows" },
  { name: "MacBook Pro M2", category: "Hardware", location: "IT Store", status: "Maintenance", icon: "laptop_mac" },
  { name: "Meeting Room B", category: "Space", location: "Building 2, Floor 3", status: "Available", icon: "meeting_room" },
];

export default function ResourcesTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Resource Name</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Category</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Location</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resources.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-50 text-slate-400 group-hover:text-[#137fec] transition-colors">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.category}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.location}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <ActionIcon icon="visibility" />
                    <ActionIcon icon="edit" />
                    <ActionIcon icon="toggle_on" color="text-emerald-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-slate-500">
        <p>Showing 1 to 5 of 42 results</p>
        <div className="flex gap-1">
           <button className="px-3 py-1 bg-[#137fec] text-white rounded font-bold">1</button>
           <button className="px-3 py-1 hover:bg-white rounded border border-transparent hover:border-gray-200">2</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Available: "bg-emerald-50 text-emerald-700 border-emerald-100 dot:bg-emerald-500",
    Reserved: "bg-amber-50 text-amber-700 border-amber-100 dot:bg-amber-500",
    Maintenance: "bg-rose-50 text-rose-700 border-rose-100 dot:bg-rose-500",
  };
  const current = styles[status] || styles.Available;
  const dotColor = current.split('dot:')[1];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter border ${current.split(' dot:')[0]}`}>
      <span className={`size-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
}

function ActionIcon({ icon, color = "text-slate-400" }: any) {
  return (
    <button className={`p-1.5 ${color} hover:text-[#137fec] hover:bg-white rounded transition-all`}>
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  );
}