"use client";
import { createContext, useContext, useState } from "react";
import DMSidebar from "../../../components/dmComponent/DMSidebar";

// Context so child pages (like [directChatId]) can open the sidebar
const DMSidebarContext = createContext<{ openSidebar: () => void }>({
  openSidebar: () => {},
});

export function useDMSidebar() {
  return useContext(DMSidebarContext);
}

export default function DMLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DMSidebarContext.Provider
      value={{ openSidebar: () => setMobileOpen(true) }}
    >
      <div className="flex w-full h-full overflow-hidden">
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
    </DMSidebarContext.Provider>
  );
}
