"use client";
import { useState } from "react";
import DMSidebar from "../../../components/dmComponent/DMSidebar";

export default function DMLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-14 z-40 w-8 h-8 flex items-center justify-center
          rounded-lg bg-surface border border-white/10 text-muted hover:text-text
          shadow-md transition-all duration-200"
      >
        ☰
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar container ──
            Desktop: static block, w-80
            Mobile:  fixed overlay, slides in/out
      ── */}
      <div
        className={`
          shrink-0 border-r border-white/7 overflow-hidden
          md:static md:w-80 md:translate-x-0 md:block
          fixed inset-y-0 left-0 z-50 w-72
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <DMSidebar onClose={() => setMobileOpen(false)} />
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}
