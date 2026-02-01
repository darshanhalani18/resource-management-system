"use client";

import React, { useState } from "react";
import { updateProfileAction } from "@/app/actions/userActions";
import { Alert } from "@/app/lib/alerts";

export default function ProfileForm({ user, joinedDate }: any) {
  const [isChanging, setIsChanging] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formName, setFormName] = useState(user.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    oldPass?: string;
    newPass?: string;
    confirmPass?: string;
  }>({});

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "DH";

  async function clientAction(formData: FormData) {
    setErrors({});

    const nameVal = formData.get("name") as string;
    const newErrs: any = {};

    if (!nameVal || nameVal.length < 3)
      newErrs.name = "Name must be at least 3 characters.";

    if (isChanging) {
      if (!oldPassword) newErrs.oldPass = "Current password is required.";
      if (!newPassword || newPassword.length < 8)
        newErrs.newPass = "New password must be at least 8 characters.";
      if (newPassword !== confirmPassword)
        newErrs.confirmPass = "Passwords do not match.";
    }

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      return;
    }

    const res = await updateProfileAction(user.id, formData);

    if (res.success) {
      Alert.success(res.message);
      setIsChanging(false);
      setErrors({});
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setErrors({ oldPass: res.message });
    }
  }

  const togglePasswordMode = () => {
    setIsChanging(!isChanging);
    setErrors({});
    if (isChanging) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form action={clientAction} className="divide-y divide-slate-100">
      <div className="p-10 bg-[#f8fafc] flex items-center gap-8">
        <div className="size-24 rounded-full bg-[#137fec] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200 ring-4 ring-white">
          {initials}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {user.name}
          </h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-widest">
              Since {joinedDate}
            </span>
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] font-black uppercase text-emerald-600">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest px-1">
              Display Name
            </label>
            <input
              name="name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className={`w-full h-14 px-5 rounded-2xl border ${errors.name ? "border-red-500 bg-red-50/10" : "border-slate-200"} font-bold text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all`}
            />
            {errors.name && (
              <span className="text-[10px] text-red-500 font-bold px-1 uppercase">
                {errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 opacity-60">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
              Email
            </label>
            <input
              value={user.email}
              disabled
              className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-bold cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2 opacity-60">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
              Organization
            </label>
            <input
              value={user.organizations?.name}
              disabled
              className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-bold cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2 opacity-60">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
              Account Role
            </label>
            <input
              value={user.roles?.name}
              disabled
              className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-bold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase">
              Login Credentials
            </h3>
            <button
              type="button"
              onClick={togglePasswordMode}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${isChanging ? "bg-slate-100 text-slate-600" : "bg-[#137fec] text-white shadow-lg shadow-blue-100"}`}
            >
              {isChanging ? "Cancel" : "Update Password"}
            </button>
          </div>

          {isChanging && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type={showOld ? "text" : "password"}
                    className={`w-full h-14 px-5 rounded-2xl border ${errors.oldPass ? "border-red-500 bg-red-50/10" : "border-slate-200"} focus:border-[#137fec] outline-none text-sm font-bold pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showOld ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.oldPass && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.oldPass}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  New Password
                </label>
                <div className="relative">
                  <input
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showNew ? "text" : "password"}
                    className={`w-full h-14 px-5 rounded-2xl border ${errors.newPass ? "border-red-500 bg-red-50/10" : "border-slate-200"} focus:border-[#137fec] outline-none text-sm font-bold pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showNew ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.newPass && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.newPass}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirm ? "text" : "password"}
                    className={`w-full h-14 px-5 rounded-2xl border ${errors.confirmPass ? "border-red-500 bg-red-50/10" : "border-slate-200"} focus:border-[#137fec] outline-none text-sm font-bold pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.confirmPass && (
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    {errors.confirmPass}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="pt-10 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto px-12 h-16 bg-[#137fec] text-white text-sm font-black rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-600 transition-all uppercase tracking-widest"
          >
            Save Profile Changes
          </button>
        </div>
      </div>
    </form>
  );
}
