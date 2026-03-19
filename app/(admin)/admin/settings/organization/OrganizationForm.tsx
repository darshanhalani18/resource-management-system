"use client";

import React, { useState } from "react";
import { updateOrganizationAction } from "@/app/actions/organizationActions";
import { Alert } from "@/app/lib/alerts";

export default function OrganizationForm({ organization }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState(organization.name || "");
  const [email, setEmail] = useState(organization.email || "");
  const [phone, setPhone] = useState(organization.phone || "");
  const [address, setAddress] = useState(organization.address || "");
  const [city, setCity] = useState(organization.city || "");
  const [state, setState] = useState(organization.state || "");
  const [country, setCountry] = useState(organization.country || "");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    const newErrs: any = {};
    const nameVal = formData.get("name") as string;
    const emailVal = formData.get("email") as string;

    if (!nameVal || nameVal.trim().length < 2) {
      newErrs.name = "Organization name is required.";
    }
    if (!emailVal || !emailVal.includes("@")) {
      newErrs.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      setIsSubmitting(false);
      return;
    }

    const res = await updateOrganizationAction(organization.id, formData);

    if (res.success) {
      Alert.success(res.message);
      setErrors({});
    } else {
      if (res.message.toLowerCase().includes("email")) {
        setErrors({ email: res.message });
      } else {
        Alert.error("Error", res.message || "Failed to save organization");
      }
    }
    setIsSubmitting(false);
  }

  return (
    <form
      action={clientAction}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="p-8 space-y-8">
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-[#137fec]">
              badge
            </span>
            <h3 className="text-lg font-bold text-[#0d141b]">Identity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                Organization Name
              </label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border ${errors.name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"} focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-bold">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                Organization Code (Permanent)
              </label>
              <div className="relative group">
                <input
                  className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed font-mono font-bold"
                  value={organization.organization_code || "N/A"}
                  readOnly
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  lock
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-[#137fec]">
              contact_mail
            </span>
            <h3 className="text-lg font-bold text-[#0d141b]">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                Contact Email
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border ${errors.email ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"} focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-bold">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                Phone Number
              </label>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-[#137fec]">
              location_on
            </span>
            <h3 className="text-lg font-bold text-[#0d141b]">
              Headquarters Location
            </h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
              Business Address
            </label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#137fec] outline-none resize-none font-bold text-slate-700"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                City
              </label>
              <input
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                State / Province
              </label>
              <input
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">
                Country
              </label>
              <input
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#137fec] outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 h-12 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Organization Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
