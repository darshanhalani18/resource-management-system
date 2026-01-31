"use client";

import React, { useState } from "react";
import LocationTree from "./components/LocationTree";
import AddLocationModal from "./components/AddLocationModal";
import Link from "next/link";

export default function LocationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2">
        <Link href="/" className="text-slate-500 text-sm font-medium hover:text-[#137fec]">
          Organization
        </Link>
        <span className="text-slate-400 text-sm">/</span>
        <span className="text-slate-900 text-sm font-bold">Locations Hierarchy</span>
      </nav>

      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-end gap-3 border-b border-gray-100 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Locations
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Manage resource locations and infrastructure hierarchy
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#137fec] hover:bg-blue-700 text-white rounded-lg h-11 px-6 font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Location</span>
        </button>
      </div>

      {/* Hierarchy Tip Card */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-4">
        <div className="size-10 rounded-full bg-white flex items-center justify-center text-[#137fec] shadow-sm flex-shrink-0">
          <span className="material-symbols-outlined">lightbulb</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Hierarchy Tip</h4>
          <p className="text-sm text-slate-600">
            Moving a location will automatically update the path for all nested resources. Ensure you verify resource availability before moving floors or buildings.
          </p>
        </div>
      </div>

      {/* The Main Tree View */}
      <LocationTree />

      {/* Modal Overlay */}
      {isModalOpen && <AddLocationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}