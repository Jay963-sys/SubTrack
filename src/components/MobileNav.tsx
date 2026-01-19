"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar"; // We reuse your existing Sidebar!

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Mobile Header Bar (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
        <div className="font-bold text-xl text-blue-500">SubTrack.</div>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 2. The Slide-out Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark backdrop to click-to-close */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* The Sidebar itself */}
          <div className="relative w-64 h-full bg-slate-900 shadow-xl animate-in slide-in-from-left duration-200">
            {/* Close Button inside the menu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Render your existing sidebar here */}
            <div onClick={() => setIsOpen(false)}>
              {" "}
              {/* Close menu when a link is clicked */}
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
