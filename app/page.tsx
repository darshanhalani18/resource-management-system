"use client";

import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8] font-sans text-slate-900 selection:bg-primary/30">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#137fec] text-white">
                <span className="material-symbols-outlined text-xl">
                  inventory_2
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                RMS
              </h2>
            </div>

            <nav className="hidden md:flex flex-1 justify-center gap-10">
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-[#137fec] transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-[#137fec] transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-[#137fec] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-[#137fec] transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="hidden sm:flex h-10 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="flex h-10 items-center justify-center rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white hover:bg-[#137fec]/90 transition-colors shadow-sm">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Manage Resources{" "}
              <span className="text-[#137fec]">Smarter & Faster</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Optimize your asset lifecycle with real-time tracking, automated
              scheduling, and preventative maintenance monitoring in one unified
              platform.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <button className="flex h-14 min-w-[160px] items-center justify-center rounded-xl bg-[#137fec] px-8 text-base font-bold text-white shadow-lg shadow-[#137fec]/25 hover:scale-[1.02] transition-transform">
                  Get Started
                </button>
              </Link>
              <button className="flex h-14 min-w-[160px] items-center justify-center rounded-xl bg-slate-200 px-8 text-base font-bold text-slate-900 hover:bg-slate-300 transition-colors">
                Live Demo
              </button>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
              <div
                className="h-[400px] w-full rounded-xl bg-slate-100 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')",
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#137fec]/5 blur-[120px]"></div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-base font-bold uppercase tracking-widest text-[#137fec]">
              Capabilities
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to control and monitor your resources
            </h3>
            <p className="mt-4 text-lg text-slate-600">
              Our comprehensive toolset enables organizations to maintain full
              visibility and control over their physical and digital inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="location_on"
              title="Resource Tracking"
              desc="Gain real-time visibility into all your physical and digital assets across departments."
            />
            <FeatureCard
              icon="calendar_month"
              title="Booking Management"
              desc="Streamline scheduling with an intuitive reservation system for teams and equipment."
            />
            <FeatureCard
              icon="build"
              title="Maintenance"
              desc="Stay ahead with automated alerts, preventative logs, and comprehensive status updates."
            />
            <FeatureCard
              icon="admin_panel_settings"
              title="Role-Based Access"
              desc="Granular permission controls to ensure secure data access and management."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f6f7f8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#137fec] px-6 py-20 text-center shadow-2xl sm:px-16">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to optimize your assets?
              </h2>
              <p className="mx-auto mt-6 text-lg text-blue-100">
                Join hundreds of organizations managing their resources more
                efficiently. Start your 14-day free trial today.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/register">
                  <button className="flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-[#137fec] hover:bg-slate-50 transition-colors shadow-lg">
                    Register Now
                  </button>
                </Link>
                <button className="flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#137fec] text-white">
                <span className="material-symbols-outlined text-xs">
                  inventory_2
                </span>
              </div>
              <span className="font-bold text-slate-900">RMS</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-8">
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-[#137fec] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-[#137fec] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-[#137fec] transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-[#137fec] transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="mt-12 text-center text-sm text-slate-400">
            © 2026 Resource Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#137fec]/30 transition-all duration-300">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#137fec]/10 text-[#137fec] group-hover:bg-[#137fec] group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <h4 className="text-xl font-bold text-slate-900">{title}</h4>
      <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
