"use client";

import { useDMSidebar } from "./layout";

export default function DMHomePage() {
  const { openSidebar } = useDMSidebar();

  return (
    <div className="flex-1 flex flex-col">
      {/* Mobile-only header for inbox view */}
      <header className="md:hidden h-13 shrink-0 flex items-center gap-3 px-3 bg-surface border-b border-white/7">
        <button
          onClick={openSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-lg
            text-muted hover:text-text hover:bg-white/8 transition-all duration-200"
        >
          ☰
        </button>
        <span className="text-[14px] font-semibold text-text">Messages</span>
      </header>

      <div className="flex-1 flex items-center justify-center text-zinc-500">
        <div className="text-center">
          <h2 className="text-lg font-medium text-zinc-300">
            Select a conversation
          </h2>
          <p className="text-sm mt-2">
            Choose a direct message from the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}
