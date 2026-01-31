"use client";

import React, { useState } from "react";

import { deleteUserAction } from "@/app/actions/userActions";
import AddUserModal from "./AddUserModal";
import Link from "next/link";
import { Alert } from "@/app/lib/alerts";
import { exportToPDF } from "@/app/lib/exportUtils";

export default function UsersTable({ initialData, roles, stats }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = initialData.filter(
    (u: any) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleExport = () => {
    const headers = [["Name", "Email", "Role", "Status"]];
    const data = filteredData.map((u: any) => [
      u.name,
      u.email,
      u.roles.name,
      u.status,
    ]);
    exportToPDF("Users Management List", headers, data);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-1">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Users Management
          </h1>
          <p className="text-slate-500">
            Manage platform access, roles, and administrative permissions.
          </p>
        </div>
        <button
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#137fec] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-100 active:scale-95 w-fit"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">
            search
          </span>
          <input
            className="w-full bg-gray-50 border-none rounded-lg pl-10 py-2 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-bold text-slate-600 hover:bg-gray-100 transition-all"
        >
          <span className="material-symbols-outlined text-lg">
            picture_as_pdf
          </span>{" "}
          Export PDF
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  User Details
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Role
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((user: any) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 flex items-center justify-center rounded-full bg-blue-50 text-[#137fec] font-black shadow-sm group-hover:bg-[#137fec] group-hover:text-white transition-all">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <Link
                          href={`/admin/users/${user.id}`}
                          scroll={false}
                          className="font-bold text-slate-800 text-sm hover:text-[#137fec] hover:underline transition-colors"
                        >
                          {user.name}
                        </Link>
                        <span className="text-xs text-slate-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[10px] font-black rounded-md uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      {user.roles.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditData(user);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-white rounded-lg transition-all border border-transparent shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={async () => {
                          if (await Alert.confirmDelete(user.name)) {
                            const res = await deleteUserAction(user.id);
                            if (res.success) Alert.success("Deleted");
                            else Alert.error("Error", res.message);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredData.length)} of{" "}
            {filteredData.length} results
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`size-7 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? "bg-[#137fec] text-white shadow-md" : "bg-white border border-gray-200 text-slate-500 hover:border-[#137fec]"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddUserModal
          onClose={() => setIsModalOpen(false)}
          editData={editData}
          roles={roles}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon, bg, color }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 ${bg} ${color} rounded-lg`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
    </div>
  );
}
