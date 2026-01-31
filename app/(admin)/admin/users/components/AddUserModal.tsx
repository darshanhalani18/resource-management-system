"use client";

import React from "react";
import { saveUserAction, editUserAction } from "@/app/actions/userActions";
import { Alert } from "@/app/lib/alerts";

export default function AddUserModal({ onClose, editData, roles }: any) {
  const clientAction = async (formData: FormData) => {
    const res = editData
      ? await editUserAction(formData)
      : await saveUserAction(formData);
    if (res.success) {
      Alert.success(editData ? "Updated" : "Saved", "User record processed.");
      onClose();
    } else {
      Alert.error("Error", res.message || "Failed to process.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="px-8 pt-8 pb-4 flex justify-between">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {editData ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form action={clientAction}>
          {editData && <input type="hidden" name="id" value={editData.id} />}
          <div className="px-8 py-4 space-y-6">
            <div>
              <label className="text-[12px] font-bold text-slate-400 uppercase">
                Full Name
              </label>
              <input
                name="name"
                defaultValue={editData?.name}
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-slate-400 uppercase">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                defaultValue={editData?.email}
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-bold text-slate-400 uppercase">
                  Role
                </label>
                <select
                  name="role_id"
                  defaultValue={editData?.role_id}
                  required
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                >
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[12px] font-bold text-slate-400 uppercase">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editData?.status || "ACTIVE"}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 bg-gray-50 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-slate-400 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-[#137fec] text-white font-bold shadow-lg shadow-blue-100"
            >
              {editData ? "Update User" : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
