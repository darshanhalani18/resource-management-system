"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0d141b]">
          Welcome back, Admin
        </h3>
        <p className="text-[#4c739a] text-sm md:text-base">
          Here's what's happening in your system today.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Resources Card */}
        <div className="flex flex-col gap-2 rounded-xl p-5 md:p-6 bg-white border border-[#e7edf3] shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[#4c739a] text-sm font-medium">
              Total Resources
            </p>
            <span className="material-symbols-outlined text-[#137fec] bg-[#137fec]/10 p-2 rounded-lg">
              inventory_2
            </span>
          </div>
          <p className="text-[#0d141b] text-2xl md:text-3xl font-bold leading-tight">
            1,284
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[#078838] text-[16px]">
              trending_up
            </span>
            <p className="text-[#078838] text-xs font-semibold uppercase tracking-wider">
              +5.2% from last month
            </p>
          </div>
        </div>

        {/* Active Bookings Card */}
        <div className="flex flex-col gap-2 rounded-xl p-5 md:p-6 bg-white border border-[#e7edf3] shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[#4c739a] text-sm font-medium">
              Active Bookings
            </p>
            <span className="material-symbols-outlined text-green-500 bg-green-500/10 p-2 rounded-lg">
              check_circle
            </span>
          </div>
          <p className="text-[#0d141b] text-2xl md:text-3xl font-bold leading-tight">
            452
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[#078838] text-[16px]">
              trending_up
            </span>
            <p className="text-[#078838] text-xs font-semibold uppercase tracking-wider">
              +12.4% from last week
            </p>
          </div>
        </div>

        {/* Maintenance Alerts Card */}
        <div className="flex flex-col gap-2 rounded-xl p-5 md:p-6 bg-white border border-[#e7edf3] shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <p className="text-[#4c739a] text-sm font-medium">
              Maintenance Alerts
            </p>
            <span className="material-symbols-outlined text-red-500 bg-red-500/10 p-2 rounded-lg">
              error
            </span>
          </div>
          <p className="text-[#0d141b] text-2xl md:text-3xl font-bold leading-tight">
            12
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-red-500 text-[16px]">
              warning
            </span>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-wider">
              3 Urgent issues
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-[#e7edf3] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#e7edf3]">
          <h2 className="text-[#0d141b] text-base md:text-lg font-bold">
            Recent Activity
          </h2>
          <button className="text-[#137fec] text-sm font-semibold hover:underline cursor-pointer">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
                  Resource Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
                  Action/Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7edf3]">
              <TableRow
                date="2023-10-24 10:30"
                user="Alex Johnson"
                initials="AJ"
                resource="MacBook Pro M2"
                status="Booked"
                statusStyles="bg-blue-100 text-blue-700"
              />
              <TableRow
                date="2023-10-24 09:15"
                user="Sarah Williams"
                initials="SW"
                resource="Conference Room B"
                status="Returned"
                statusStyles="bg-green-100 text-green-700"
              />
              <TableRow
                date="2023-10-23 16:45"
                user="Mike Ross"
                initials="MR"
                resource="Projector 4K"
                status="Under Repair"
                statusStyles="bg-amber-100 text-amber-700"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#e7edf3] flex justify-center">
          <nav className="flex gap-2">
            <PaginationButton icon="chevron_left" />
            <PaginationButton label="1" active />
            <PaginationButton label="2" />
            <PaginationButton label="3" />
            <PaginationButton icon="chevron_right" />
          </nav>
        </div>
      </div>

      {/* Quick Actions & Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#e7edf3] p-5 md:p-6 shadow-sm">
          <h3 className="text-[#0d141b] text-base font-bold mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#e7edf3] hover:border-[#137fec] hover:bg-[#137fec]/5 transition-all group">
              <span className="material-symbols-outlined text-[#137fec] text-2xl md:text-3xl">
                add_box
              </span>
              <span className="text-sm font-medium text-[#0d141b]">
                Add Resource
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#e7edf3] hover:border-[#137fec] hover:bg-[#137fec]/5 transition-all group">
              <span className="material-symbols-outlined text-[#137fec] text-2xl md:text-3xl">
                person_add
              </span>
              <span className="text-sm font-medium text-[#0d141b]">
                New User
              </span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl border border-[#e7edf3] p-5 md:p-6 shadow-sm">
          <h3 className="text-[#0d141b] text-base font-bold mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <StatusBar
              label="Server Load"
              value="24%"
              width="24%"
              color="bg-[#078838]"
            />
            <StatusBar
              label="API Latency"
              value="42ms"
              width="15%"
              color="bg-[#078838]"
            />
            <StatusBar
              label="Storage Usage"
              value="82%"
              width="82%"
              color="bg-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */

function TableRow({
  date,
  user,
  initials,
  resource,
  status,
  statusStyles,
}: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-[#4c739a] text-sm">{date}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#137fec]/20 flex items-center justify-center text-[#137fec] text-[10px] font-bold">
            {initials}
          </div>
          <span className="text-[#0d141b] text-sm font-medium">{user}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-[#4c739a] text-sm">{resource}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

function PaginationButton({ label, icon, active }: any) {
  return (
    <button
      className={`h-8 w-8 flex items-center justify-center rounded border border-[#e7edf3] text-xs font-bold transition-all ${active ? "bg-[#137fec] text-white border-[#137fec]" : "text-[#4c739a] hover:bg-slate-50"}`}
    >
      {icon ? (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      ) : (
        label
      )}
    </button>
  );
}

function StatusBar({ label, value, width, color }: any) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-semibold text-[#4c739a]">{label}</span>
        <span
          className={`text-xs font-semibold ${color.replace("bg-", "text-")}`}
        >
          {value}
        </span>
      </div>
      <div className="w-full bg-[#f0f2f5] rounded-full h-1.5">
        <div className={`${color} h-1.5 rounded-full`} style={{ width }}></div>
      </div>
    </div>
  );
}
