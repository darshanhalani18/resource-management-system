"use client";

import React, { useState } from "react";
import ResourcesTable from "./components/ResourcesTable";
import AddResourceModal from "./components/AddResourceModal";

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Resources</h1>
          <p className="text-slate-500">Manage and monitor your system's hardware and space allocation</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#137fec] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95 w-fit"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Add Resource</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Resources" value="42" icon="inventory" color="text-slate-600" bg="bg-slate-100" />
        <StatCard title="Available Now" value="28" icon="check_circle" color="text-emerald-600" bg="bg-emerald-50" dot="bg-emerald-500" />
        <StatCard title="Reserved" value="12" icon="schedule" color="text-amber-600" bg="bg-amber-50" dot="bg-amber-500" />
        <StatCard title="Maintenance" value="2" icon="build" color="text-rose-600" bg="bg-rose-50" dot="bg-rose-500" />
      </div>

      {/* Table Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <FilterButton label="All Resources" active />
          <FilterButton label="Available" />
          <FilterButton label="Reserved" />
          <FilterButton label="Under Maintenance" />
        </div>
        <div className="flex gap-2">
          <IconButton icon="filter_list" />
          <IconButton icon="file_download" />
        </div>
      </div>

      {/* Main Table */}
      <ResourcesTable />

      {/* Modal */}
      {isModalOpen && <AddResourceModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

/* Helper Components for the Dashboard Area */
function StatCard({ title, value, icon, color, bg, dot }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 ${bg} rounded-lg ${color}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {dot && <span className={`flex h-2 w-2 rounded-full ${dot}`}></span>}
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
    </div>
  );
}

function FilterButton({ label, active }: any) {
  return (
    <button className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
      active ? 'bg-white border-gray-200 text-[#137fec] shadow-sm' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
    }`}>
      {label}
    </button>
  );
}

function IconButton({ icon }: any) {
  return (
    <button className="flex size-10 items-center justify-center rounded-lg bg-white border border-gray-200 text-slate-500 hover:bg-gray-50">
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}