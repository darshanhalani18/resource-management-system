"use client";

import React, { useState } from "react";
import { inviteUserAction } from "@/app/actions/userActions";

export default function InviteUserFlow({ orgId, roles }: { orgId: number; roles: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"FORM" | "SUCCESS">("FORM");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const res = await inviteUserAction({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      roleId: Number(formData.get("role_id")),
      orgId: orgId,
    });

    setLoading(false);
    if (res.success) {
      setResult(res.data);
      setStep("SUCCESS");
    } else {
      alert(res.error || "Failed to invite");
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setStep("FORM");
    setResult(null);
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="px-8 py-3 rounded-xl bg-[#137fec] text-white font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-600 transition-colors">
      <span className="material-symbols-outlined">person_add</span>
      Invite User
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-[500px] rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {step === "FORM" ? (
          <form onSubmit={handleInvite}>
            <div className="p-8 pb-4 flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Invite User</h2>
                <p className="text-slate-500 font-medium text-sm">Grant system access to a new member.</p>
              </div>
              <button type="button" onClick={closeAll} className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-8 py-4 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                <input name="name" required className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#137fec] outline-none transition-all text-slate-900" placeholder="e.g. John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                <input name="email" type="email" required className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#137fec] outline-none transition-all text-slate-900" placeholder="john@company.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Role</label>
                <div className="relative">
                  <select name="role_id" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none appearance-none text-slate-900 font-medium">
                    {roles.map((r: any) => <option key={r.id} value={r.id}>{r.name.toUpperCase()}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 flex flex-row-reverse gap-3 border-t border-slate-100">
              <button disabled={loading} type="submit" className="px-8 py-3 rounded-xl bg-[#137fec] text-white font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition-all">
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : "Send Invitation"}
              </button>
              <button type="button" onClick={closeAll} className="px-6 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col">
            <div className="pt-10 pb-6 flex flex-col items-center text-center px-6">
              <div className="size-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-emerald-500 text-5xl">check_circle</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Invitation Ready!</h2>
              <p className="text-slate-500 mt-2 text-sm px-10 font-medium">The user has been added to the system. Share these credentials with them.</p>
            </div>

            <div className="px-8 py-2 space-y-3">
              <div className="flex justify-between items-center py-4 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Org Code</span>
                <span className="text-sm font-mono bg-slate-100 px-3 py-1 rounded-lg font-bold text-slate-700">{result.orgCode}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Email</span>
                <span className="text-sm font-bold text-slate-900">{result.email}</span>
              </div>
            </div>

            <div className="px-8 py-6">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Temporary Password</label>
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex justify-between items-center group">
                <span className="text-xl font-mono font-black text-[#137fec]">{result.tempPassword}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(result.tempPassword);
                    alert("Password copied!");
                  }}
                  className="bg-[#137fec] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-600 shadow-md transition-all active:scale-95"
                >
                  Copy Code
                </button>
              </div>
              <p className="text-center text-[11px] text-amber-600 font-bold mt-4 bg-amber-50 py-2 rounded-lg italic">
                ⚠️ User will be forced to change this on their first login.
              </p>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <button onClick={closeAll} className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-[0.98]">
                Close and Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}