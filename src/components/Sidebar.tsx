"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, Settings } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import clsx from "clsx";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser(); // <--- Get isLoaded

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-500">
          SubTrack.
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Auth Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2 w-full">
          {/* Clerk handles the Avatar and Dropdown Menu automatically */}
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            {!isLoaded ? (
              // Skeleton Loader state
              <div className="h-4 w-24 bg-slate-800 rounded animate-pulse mb-1" />
            ) : (
              // Actual Data
              <span className="text-sm font-medium text-white">
                {user?.firstName || "User"}
              </span>
            )}
            <span className="text-xs text-slate-500">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
