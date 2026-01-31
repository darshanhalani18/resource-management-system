"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth.actions";

const menuItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin" },
  { icon: "group", label: "Users", href: "/admin/users" },
  {
    icon: "category",
    label: "Resource Categories",
    href: "/admin/resource-categories",
  },
  { icon: "location_on", label: "Locations", href: "/admin/locations" },
  { icon: "inventory_2", label: "Resources", href: "/admin/resources" },
  { icon: "event_available", label: "Bookings", href: "/admin/bookings" },
  { icon: "build", label: "Maintenance", href: "/admin/maintenance" },
];

interface SidebarProps {
  adminName: string;
}

export default function Sidebar({ adminName }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`${isOpen ? "w-64" : "w-[4.5rem]"} transition-all duration-300 flex-shrink-0 border-r border-[#e7edf3] bg-white flex flex-col justify-between overflow-hidden h-screen`}
    >
      <div className="p-4 flex flex-col gap-6">
        <div
          className={`flex items-center gap-3 px-2 transition-all ${!isOpen && "justify-center"}`}
        >
          <div
            className="flex-shrink-0 bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]/20"
            style={{
              backgroundImage: `url("https://ui-avatars.com/api/?name=${adminName}&background=137fec&color=fff&bold=true")`,
            }}
          ></div>
          {isOpen && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <h1 className="text-[#0d141b] text-sm font-semibold leading-tight truncate">
                {adminName}
              </h1>
              <p className="text-[#4c739a] text-xs font-normal">
                Administrator
              </p>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#137fec] text-white shadow-sm"
                    : "text-[#0d141b] hover:bg-[#e7edf3]"
                } ${!isOpen && "justify-center px-0"}`}
              >
                <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                  {item.icon}
                </span>
                {isOpen && (
                  <p className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </p>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className={`flex w-full items-center gap-2 rounded-lg h-11 border border-[#e7edf3] bg-white text-red-500 text-sm font-bold hover:bg-red-50 transition-all active:scale-95 ${isOpen ? "px-4 justify-start" : "justify-center px-0"}`}
          >
            <span className="material-symbols-outlined text-[18px] flex-shrink-0">
              logout
            </span>
            {isOpen && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
