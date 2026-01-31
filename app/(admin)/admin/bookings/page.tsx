"use client";

import React, { useState } from "react";
import BookingsTable from "./components/BookingsTable";
import AddBookingModal from "./components/AddBookingModal";

export default function BookingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Bookings");

  const tabs = ["All Bookings", "Pending", "Approved", "Rejected", "Cancelled"];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Heading at the Top */}
      <div className="flex flex-wrap justify-between items-end gap-3 px-1">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 text-3xl font-black tracking-tight">Bookings</h1>
          <p className="text-slate-500 text-base">Review and manage all resource reservations across the organization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg h-11 px-6 font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Booking</span>
        </button>
      </div>

      {/* 2. Stats Summary Grid in the Middle */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value="1,240" icon="calendar_today" trend="+5.2%" trendUp />
        <StatCard title="Pending Requests" value="12" icon="pending_actions" color="text-amber-500" note="Requires action" />
        <StatCard title="Approved" value="850" icon="check_circle" color="text-emerald-500" note="68% of total" />
        <StatCard title="Cancelled" value="45" icon="cancel" color="text-rose-500" note="Decreased by 2%" />
      </div>

      {/* 3. Filters and Table at the Bottom */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 pt-4 border-b border-gray-100">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 whitespace-nowrap text-sm font-bold transition-all ${
                  activeTab === tab ? "border-[#137fec] text-[#137fec]" : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <BookingsTable />
      </div>

      {/* Modal */}
      {isModalOpen && <AddBookingModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function StatCard({ title, value, icon, color = "text-slate-400", trend, trendUp, note }: any) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <span className={`material-symbols-outlined ${color}`}>{icon}</span>
      </div>
      <p className="text-slate-900 tracking-tight text-3xl font-bold">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-xs">{trendUp ? 'trending_up' : 'trending_down'}</span>
          <span>{trend} from last month</span>
        </div>
      )}
      {note && (
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded-full w-fit">
          {note}
        </div>
      )}
    </div>
  );
}