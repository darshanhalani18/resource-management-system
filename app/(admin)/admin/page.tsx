import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await decrypt(sessionToken);
  const adminName = (session.userName as string) || "Admin";

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0d141b]">
          Welcome back, {adminName}
        </h3>
        <p className="text-[#4c739a] text-sm md:text-base">
          Here's what's happening in your system today.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Resources */}
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

        {/* Active Bookings */}
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

        {/* Maintenance Alerts */}
        <div className="flex flex-col gap-2 rounded-xl p-5 md:p-6 bg-white border border-[#e7edf3] shadow-sm">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-white rounded-xl border border-[#e7edf3] p-5 md:p-6 shadow-sm">
          <h3 className="text-[#0d141b] text-base font-bold mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#e7edf3] hover:border-[#137fec] transition-all">
              <span className="material-symbols-outlined text-[#137fec] text-2xl">
                add_box
              </span>
              <span className="text-sm font-medium">Add Resource</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#e7edf3] hover:border-[#137fec] transition-all">
              <span className="material-symbols-outlined text-[#137fec] text-2xl">
                person_add
              </span>
              <span className="text-sm font-medium">New User</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e7edf3] p-5 md:p-6 shadow-sm">
          <h3 className="text-[#0d141b] text-base font-bold mb-4">
            System Status
          </h3>
          <div className="space-y-4 text-sm font-semibold text-[#4c739a]">
            <div className="flex justify-between">
              <span>Server Load</span>
              <span className="text-[#078838]">24%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="bg-[#078838] h-2 w-[24%] rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <span>API Latency</span>
              <span className="text-[#078838]">42ms</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="bg-[#078838] h-2 w-[15%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
