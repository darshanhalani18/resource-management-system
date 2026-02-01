"use client";

import React, { useState } from "react";
import { deleteUserAction } from "@/app/actions/userActions";
import { Alert } from "@/app/lib/alerts";

export default function UsersTable({ initialData, stats, currentUserId }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = initialData.filter(
    (u: any) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Users Management
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Overview of organization accounts and roles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.total}
          icon="group"
          bg="bg-slate-100"
          color="text-slate-600"
        />
        <StatCard
          title="Active Now"
          value={stats.active}
          icon="verified"
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
        <StatCard
          title="Administrators"
          value={stats.admins}
          icon="shield_person"
          bg="bg-blue-50"
          color="text-[#137fec]"
        />
        <StatCard
          title="New Joinees"
          value={stats.new}
          icon="person_add"
          bg="bg-amber-50"
          color="text-amber-600"
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden mt-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest">
                User Details
              </th>
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest">
                Role
              </th>
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((user: any) => {
              const isSelf = user.id === currentUserId;
              const initials = user.name
                .split(" ")
                .map((n: any) => n[0])
                .join("")
                .toUpperCase();

              return (
                <tr
                  key={user.id}
                  className={isSelf ? "bg-blue-50/40" : "hover:bg-slate-50"}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`size-11 rounded-full flex items-center justify-center font-black text-xs ${isSelf ? "bg-[#137fec] text-white" : "bg-slate-100 text-slate-400"}`}
                      >
                        {initials}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {user.name}
                          </span>
                          {isSelf && (
                            <span className="px-2 py-0.5 rounded-md bg-[#137fec] text-[9px] font-black text-white uppercase">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase bg-white border border-slate-200 text-slate-600">
                      {user.roles.name}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {!isSelf ? (
                      <button
                        onClick={async () => {
                          if (await Alert.confirmDelete(user.name)) {
                            const res = await deleteUserAction(
                              user.id,
                              currentUserId,
                            );
                            if (res.success) Alert.success(res.message);
                            else Alert.error("Error", res.message);
                          }
                        }}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    ) : (
                      <div className="px-3 opacity-30 grayscale">
                        <span className="material-symbols-outlined text-xl">
                          lock
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg, color }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`size-10 ${bg} ${color} rounded-xl flex items-center justify-center mb-4`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );
}
