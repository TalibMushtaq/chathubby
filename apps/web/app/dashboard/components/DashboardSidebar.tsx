// app/dashboard/components/DashboardSidebar.tsx
interface Props {
  user: {
    displayname: string;
    username: string;
  };
}
export default function DashboardSidebar({ user }: Props) {
  const initial =
    user?.displayname?.charAt(0) || user?.username?.charAt(0) || "U";

  return (
    <aside className="w-18 bg-surface border-r border-border flex flex-col items-center py-4 gap-1">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl mb-3">
        ⚡
      </div>

      <div className="w-8 h-px bg-border my-1" />

      <button className="w-11 h-11 rounded-xl bg-primary/15 text-primary">
        🏠
      </button>

      <button className="w-11 h-11 rounded-xl text-muted hover:bg-surface-2 hover:text-text transition">
        💬
      </button>

      <button className="w-11 h-11 rounded-xl text-muted hover:bg-surface-2 hover:text-text transition">
        🔭
      </button>
    </aside>
  );
}
