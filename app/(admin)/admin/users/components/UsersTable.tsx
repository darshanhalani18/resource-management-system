"use client";

import React, { useState } from "react";
import { deleteUserAction, resendInvitationAction } from "@/app/actions/userActions";
import { Alert } from "@/app/lib/alerts";
import InviteUserFlow from "./InviteUserFlow"; 

export default function UsersTable({ initialData, stats, currentUserId, roles, orgId }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ACTIVE"); // ACTIVE or PENDING

  const filteredData = initialData.filter((u: any) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = u.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header with Invite Button */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Users Management</h1>
          <p className="text-slate-500 font-medium text-sm">Overview of organization accounts and roles.</p>
        </div>
        <InviteUserFlow orgId={orgId} roles={roles} />
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("ACTIVE")}
          className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === "ACTIVE" ? "border-b-2 border-[#137fec] text-[#137fec]" : "text-slate-400"}`}
        >
          Active Members
        </button>
        <button 
          onClick={() => setActiveTab("PENDING")}
          className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === "PENDING" ? "border-b-2 border-[#137fec] text-[#137fec]" : "text-slate-400"}`}
        >
          Pending Invitations
        </button>
      </div>

      {/* Stats Cards (Your existing StatCard components go here...) */}

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden mt-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest">User Details</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest">Role</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest">Status</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((user: any) => {
              const isSelf = user.id === currentUserId;
              return (
                <tr key={user.id} className={isSelf ? "bg-blue-50/40" : "hover:bg-slate-50"}>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                       <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                       <span className="text-xs text-slate-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-200 text-slate-600">
                      {user.roles.name}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right flex justify-end gap-2">
                    {user.status === 'PENDING' && (
                       <button 
                        title="Resend Invitation"
                        onClick={async () => {
                          const res = await resendInvitationAction(user.id);
                          if(res.success) Alert.success("New Code Generated", `New Password: ${res.tempPassword}`);
                        }}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-full transition-all"
                       >
                         <span className="material-symbols-outlined text-xl">sync</span>
                       </button>
                    )}
                    {!isSelf && (
                      <button 
                        onClick={() => {/* existing delete logic */}}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
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