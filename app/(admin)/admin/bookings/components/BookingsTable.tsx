"use client";

import React from "react";

const bookingsData = [
  { id: 1, resource: "Conference Room A", sub: "Meeting Room • 4th Floor", user: "Jane Doe", start: "Oct 24, 2023, 09:00 AM", end: "Oct 24, 2023, 11:30 AM", status: "Approved" },
  { id: 2, resource: "Projector 02", sub: "Equipment • AV Storage", user: "John Smith", start: "Oct 25, 2023, 02:00 PM", end: "Oct 25, 2023, 04:00 PM", status: "Pending" },
  { id: 3, resource: "Workspace 4", sub: "Individual • Open Office", user: "Alice Wong", start: "Oct 26, 2023, 10:00 AM", end: "Oct 26, 2023, 05:00 PM", status: "Approved" },
  { id: 4, resource: "Meeting Pod", sub: "Small • Quiet Zone", user: "Robert Fox", start: "Oct 27, 2023, 01:00 PM", end: "Oct 27, 2023, 02:00 PM", status: "Rejected" },
  { id: 5, resource: "Conference Room B", sub: "Meeting Room • 4th Floor", user: "Cody Fisher", start: "Oct 28, 2023, 09:00 AM", end: "Oct 28, 2023, 11:00 AM", status: "Cancelled" },
];

export default function BookingsTable() {
  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Resource</th>
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Booked By</th>
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Start Date & Time</th>
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">End Date & Time</th>
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookingsData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="text-slate-900 text-sm font-semibold">{item.resource}</span>
                    <span className="text-xs text-slate-500">{item.sub}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url('https://i.pravatar.cc/150?u=${item.user}')` }}></div>
                    <span className="text-slate-900 text-sm font-medium">{item.user}</span>
                  </div>
                </td>
                <td className="px-4 py-5 text-slate-600 text-sm">{item.start}</td>
                <td className="px-4 py-5 text-slate-600 text-sm">{item.end}</td>
                <td className="px-4 py-5">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <ActionButton icon="visibility" title="View" color="text-slate-600" />
                    <ActionButton icon="check" title="Approve" color="text-emerald-600" hoverBg="hover:bg-emerald-100" />
                    <ActionButton icon="close" title="Reject" color="text-rose-600" hoverBg="hover:bg-rose-100" />
                    <ActionButton icon="delete" title="Delete" color="text-slate-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Container */}
      <div className="flex items-center justify-between mt-8 border-t border-slate-100 pt-6">
        <p className="text-sm text-slate-500">Showing 1 to 5 of 1,240 entries</p>
        <div className="flex items-center gap-2">
          <PaginationButton icon="chevron_left" />
          <PaginationButton label="1" active />
          <PaginationButton label="2" />
          <PaginationButton label="3" />
          <span className="text-slate-400">...</span>
          <PaginationButton label="124" />
          <PaginationButton icon="chevron_right" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Rejected: "bg-rose-100 text-rose-700",
    Cancelled: "bg-slate-100 text-slate-700"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionButton({ icon, title, color, hoverBg = "hover:bg-slate-100" }: any) {
  return (
    <button className={`p-1.5 rounded transition-all ${color} ${hoverBg}`} title={title}>
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </button>
  );
}

function PaginationButton({ label, icon, active }: any) {
  return (
    <button className={`size-9 flex items-center justify-center rounded-lg transition-all text-sm font-medium ${
      active ? 'bg-[#137fec] text-white font-bold' : 'border border-transparent text-slate-600 hover:bg-slate-100'
    } ${icon ? 'border-slate-200' : ''}`}>
      {icon ? <span className="material-symbols-outlined">{icon}</span> : label}
    </button>
  );
}