"use client";

import React, { useState } from "react";
import MaintenanceTable from "./components/MaintenanceTable";
import AddMaintenanceModal from "./components/AddMaintenanceModal";

export default function MaintenancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      {/* 1. TOP SECTION: Title and Action Button */}
      <div className="flex flex-wrap justify-between items-end gap-4 px-1">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#0d141b] text-3xl font-black leading-tight tracking-tight">
            Maintenance
          </h1>
          <p className="text-[#4c739a] text-base font-normal">
            Monitor and manage resource maintenance schedules and tasks.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex min-w-[160px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#137fec] text-white text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Schedule Maintenance</span>
        </button>
      </div>

      {/* 2. MIDDLE SECTION: Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value="128" icon="assignment" />
        <StatCard title="Scheduled" value="42" icon="calendar_month" color="text-[#137fec]" border="border-l-[#137fec]" />
        <StatCard title="In Progress" value="15" icon="sync" color="text-amber-600" border="border-l-amber-500" />
        <StatCard title="Completed" value="71" icon="check_circle" color="text-emerald-600" border="border-l-emerald-500" />
      </div>

      {/* 3. BOTTOM SECTION: Table with Search and Filter */}
      <div className="bg-white rounded-xl border border-[#cfdbe7] shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#cfdbe7] bg-white">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c739a]">search</span>
            <input 
              className="w-full bg-[#e7edf3] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec]/50 text-[#0d141b]" 
              placeholder="Search by resource name or ID..." 
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#e7edf3] rounded-lg text-sm font-medium hover:bg-[#dbe4ee] transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#e7edf3] rounded-lg text-sm font-medium hover:bg-[#dbe4ee] transition-colors">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </button>
          </div>
        </div>
        
        <MaintenanceTable />
      </div>

      {/* Modal toggle logic */}
      {isModalOpen && <AddMaintenanceModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function StatCard({ title, value, icon, color = "text-[#4c739a]", border = "border-l-transparent" }: any) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl p-6 bg-white border ${border} border-l-4 border-gray-200 shadow-sm transition-transform hover:scale-[1.02]`}>
      <div className="flex justify-between items-start">
        <p className={`${color} text-sm font-bold uppercase tracking-wider`}>{title}</p>
        <span className={`material-symbols-outlined ${color}`}>{icon}</span>
      </div>
      <p className="text-[#0d141b] tracking-light text-3xl font-bold leading-tight">{value}</p>
    </div>
  );
}