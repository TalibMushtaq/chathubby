"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  user: {
    displayname: string;
    username: string;
  };
}

export default function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const initial =
    user?.displayname?.charAt(0) || user?.username?.charAt(0) || "U";

  // Helper to determine if a nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: "/dashboard", icon: "🏠", label: "Home" },
    { href: "/dashboard/dm", icon: "💬", label: "Direct Messages" },
    { href: "#", icon: "🔭", label: "Explore" },
  ];

  return (
    <aside className="w-18 bg-surface border-r border-border flex flex-col items-center py-4 gap-1">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl mb-3">
        ⚡
      </div>

      <div className="w-8 h-px bg-border my-1" />

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          title={item.label}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition ${
            isActive(item.href)
              ? "bg-primary/15 text-primary"
              : "text-muted hover:bg-surface-2 hover:text-text"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </aside>
  );
}
