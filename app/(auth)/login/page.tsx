"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth.actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    orgCode: "",
    email: "",
    password: "",
  });
  const [clearedErrors, setClearedErrors] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (state?.data) {
      setFormData({
        orgCode: state.data.orgCode || "",
        email: state.data.email || "",
        password: state.data.password || "",
      });
      setClearedErrors({});
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (state?.errors?.[name]) {
      setClearedErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const getError = (fieldName: string) => {
    if (clearedErrors[fieldName]) return null;
    return state?.errors?.[fieldName]?.[0];
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f6f7f8] text-[#0d141b]">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="w-full h-32 flex items-center justify-center bg-[#137fec]/5">
              <div className="size-16 text-[#137fec] bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl">
                  account_circle
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black tracking-tight">
                  Welcome back to RMS
                </h2>
                <p className="text-[#4c739a] mt-2 text-sm font-medium">
                  Enter your credentials to continue.
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                <InputField
                  label="Organization Code"
                  name="orgCode"
                  placeholder="e.g. RMS-1234"
                  value={formData.orgCode}
                  onChange={handleInputChange}
                  error={getError("orgCode")}
                />

                <InputField
                  label="Admin Email Address"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={getError("email")}
                />

                <div className="relative flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label
                      className={`text-[11px] font-black uppercase tracking-widest ${getError("password") ? "text-red-500" : "text-slate-700"}`}
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      size="xs"
                      className="text-[10px] font-black text-[#137fec] hover:underline uppercase"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password} // BOUND TO STATE: Persists after failure
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border h-12 px-4 pr-12 text-sm font-bold transition-all outline-none bg-white ${getError("password") ? "border-red-500" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-0 h-full text-slate-400"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {getError("password") && (
                    <span className="text-[10px] text-red-500 font-bold uppercase">
                      {getError("password")}
                    </span>
                  )}
                </div>

                {state?.error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                    <span className="material-symbols-outlined text-sm">
                      error
                    </span>
                    <span className="text-xs font-bold uppercase tracking-tight">
                      {state.error}
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    disabled={isPending}
                    type="submit"
                    className="w-full h-14 bg-[#137fec] text-white rounded-xl font-black uppercase tracking-wide shadow-lg hover:opacity-95 disabled:opacity-70 transition-all active:scale-[0.98]"
                  >
                    {isPending ? "Authenticating..." : "Sign In to Dashboard"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InputField({ label, name, error, value, onChange, ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-[11px] font-black uppercase tracking-widest ${error ? "text-red-500" : "text-slate-700"}`}
      >
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border h-12 px-4 text-sm font-bold transition-all outline-none bg-white ${error ? "border-red-500" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-red-500 font-bold uppercase tracking-tight">
          {error}
        </span>
      )}
    </div>
  );
}
