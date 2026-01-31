"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import { registerOrganizationAction } from "@/app/actions/auth.actions";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerOrganizationAction,
    null,
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    orgName: "",
    orgEmail: "",
    orgType: "",
    country: "",
    state: "",
    city: "",
    address: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [clearedErrors, setClearedErrors] = useState<Record<string, boolean>>(
    {},
  );

  const [locationLists, setLocationLists] = useState({
    states: [] as any[],
    cities: [] as any[],
  });

  useEffect(() => {
    if (state?.data) {
      const d = state.data;
      setFormData({
        orgName: d.orgName || "",
        orgEmail: d.orgEmail || "",
        orgType: d.orgType || "",
        country: d.country || "",
        state: d.state || "",
        city: d.city || "",
        address: d.address || "",
        adminName: d.adminName || "",
        email: d.email || "",
        password: d.password || "",
        confirmPassword: d.confirmPassword || "",
      });

      const cCode = d.country || "";
      const sCode = d.state || "";

      setLocationLists({
        states: cCode ? State.getStatesOfCountry(cCode) : [],
        cities: cCode && sCode ? City.getCitiesOfState(cCode, sCode) : [],
      });
      setClearedErrors({});
    }
  }, [state]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (state?.errors?.[name]) {
      setClearedErrors((prev) => ({
        ...prev,
        [name]: true,
      }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      state: "",
      city: "",
    }));
    setLocationLists({
      states: countryCode ? State.getStatesOfCountry(countryCode) : [],
      cities: [],
    });
    // Clear error
    if (state?.errors?.country)
      setClearedErrors((prev) => ({ ...prev, country: true }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: stateCode,
      city: "",
    }));
    setLocationLists((prev) => ({
      ...prev,
      cities:
        formData.country && stateCode
          ? City.getCitiesOfState(formData.country, stateCode)
          : [],
    }));

    if (state?.errors?.state)
      setClearedErrors((prev) => ({ ...prev, state: true }));
  };

  const getError = (fieldName: string) => {
    if (clearedErrors[fieldName]) return null;
    return state?.errors?.[fieldName]?.[0];
  };

  if (state?.success) {
    return (
      <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center p-6 text-[#0d141b]">
        <div className="max-w-[640px] w-full bg-white shadow-xl rounded-xl p-10 text-center border border-slate-200">
          <div className="size-24 bg-green-100 rounded-full text-green-600 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-6xl">
              check_circle
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Organization Created!</h1>
          <p className="text-slate-600 mb-8">
            Workspace <b>{state.orgName}</b> is ready.
          </p>
          <div className="bg-[#137fec]/5 border border-[#137fec]/20 p-6 rounded-xl flex items-center justify-between mb-8">
            <div className="text-left">
              <p className="text-[#137fec] text-2xl font-black tracking-widest">
                {state.orgCode}
              </p>
              <p className="text-slate-500 text-xs font-bold uppercase">
                Org Code
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(state.orgCode);
                setCopied(true);
              }}
              className="bg-[#137fec] text-white px-6 py-2 rounded-lg font-bold"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <Link href="/login" className="w-full">
            <button className="w-full h-14 bg-[#137fec] text-white rounded-lg font-bold shadow-lg">
              Proceed to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f8] font-display min-h-screen flex flex-col text-[#0d141b]">
      <header className="flex items-center justify-between bg-white border-b border-[#e7edf3] px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-[#137fec] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">
              corporate_fare
            </span>
          </div>
          <h2 className="text-lg font-bold">RMS</h2>
        </div>
      </header>

      <main className="flex justify-center py-12 px-4">
        <div className="max-w-[800px] w-full bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h1 className="text-3xl font-black">Register Organization</h1>
            <p className="text-[#4c739a] mt-2 text-sm">
              Set up your workspace and admin account.
            </p>
          </div>

          <form action={formAction} className="p-8 space-y-10 bg-white">
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#137fec]">
                  domain
                </span>{" "}
                Organization Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Organization Name"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  error={getError("orgName")}
                  colSpan="md:col-span-2"
                />

                <InputField
                  label="Organization Email"
                  name="orgEmail"
                  type="email"
                  value={formData.orgEmail}
                  onChange={handleInputChange}
                  error={getError("orgEmail")}
                />

                <div className="flex flex-col gap-2">
                  <span
                    className={`text-sm font-semibold ${getError("orgType") ? "text-red-500" : ""}`}
                  >
                    Org Type
                  </span>
                  <select
                    name="orgType"
                    value={formData.orgType}
                    onChange={handleInputChange}
                    className={`h-12 border rounded-lg px-4 outline-none bg-white ${getError("orgType") ? "border-red-500" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
                  >
                    <option value="">Select type</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="startup">Startup</option>
                    <option value="government">Government</option>
                  </select>
                  {getError("orgType") && (
                    <span className="text-[10px] text-red-500 font-bold uppercase">
                      {getError("orgType")}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Country</span>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="h-12 border rounded-lg px-4 border-[#cfdbe7] bg-white outline-none focus:ring-2 focus:ring-[#137fec]"
                  >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">State</span>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    className="h-12 border rounded-lg px-4 border-[#cfdbe7] bg-white outline-none focus:ring-2 focus:ring-[#137fec]"
                  >
                    <option value="">Select State</option>
                    {locationLists.states.map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">City</span>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-12 border rounded-lg px-4 border-[#cfdbe7] bg-white outline-none focus:ring-2 focus:ring-[#137fec]"
                  >
                    <option value="">Select City</option>
                    {locationLists.cities.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className="text-sm font-semibold">Address</span>
                  <textarea
                    name="address"
                    rows={3}
                    className="w-full rounded-lg border border-[#cfdbe7] bg-white p-4 outline-none focus:ring-2 focus:ring-[#137fec] mt-1 resize-none"
                    placeholder="Enter street address..."
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#137fec]">
                  admin_panel_settings
                </span>
                <h2 className="text-xl font-bold">Admin Account</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Admin Name"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  error={getError("adminName")}
                />
                <InputField
                  label="Admin Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={getError("email")}
                />

                <div className="relative flex flex-col gap-2">
                  <span
                    className={`text-sm font-semibold ${getError("password") ? "text-red-500" : ""}`}
                  >
                    Password
                  </span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={showPass ? "text" : "password"}
                    className={`h-12 border rounded-lg px-4 pr-12 outline-none bg-white ${getError("password") ? "border-red-500" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-10 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPass ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                  {getError("password") && (
                    <span className="text-[10px] text-red-500 font-bold uppercase">
                      {getError("password")}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col gap-2">
                  <span
                    className={`text-sm font-semibold ${getError("confirmPassword") ? "text-red-500" : ""}`}
                  >
                    Confirm Password
                  </span>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={showConfirm ? "text" : "password"}
                    className={`h-12 border rounded-lg px-4 pr-12 outline-none bg-white ${getError("confirmPassword") ? "border-red-500" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-10 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                  {getError("confirmPassword") && (
                    <span className="text-[10px] text-red-500 font-bold uppercase">
                      {getError("confirmPassword")}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <button
              disabled={isPending}
              type="submit"
              className="w-full h-14 bg-[#137fec] text-white rounded-xl font-bold shadow-lg hover:opacity-95 transition-all"
            >
              {isPending ? "Creating Workspace..." : "Create Organization"}
            </button>

            <div className="text-center text-sm text-slate-500 font-medium">
              Already have an organization?{" "}
              <Link
                href="/login"
                className="text-[#137fec] font-bold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  error,
  value,
  onChange,
  colSpan = "",
  ...props
}: any) {
  return (
    <div className={`flex flex-col gap-2 ${colSpan}`}>
      <span className={`text-sm font-semibold ${error ? "text-red-500" : ""}`}>
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border h-12 px-4 outline-none bg-white transition-all ${error ? "border-red-500 focus:ring-red-100" : "border-[#cfdbe7] focus:ring-2 focus:ring-[#137fec]"}`}
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
