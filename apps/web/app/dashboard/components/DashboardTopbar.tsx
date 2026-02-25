// DashboardTopbar.tsx

interface Props {
  user: {
    displayname?: string;
    username: string;
  };
}

export default function DashboardTopbar({ user }: Props) {
  const initial =
    user?.displayname?.charAt(0) || user?.username?.charAt(0) || "U";

  return (
    <header className="h-15 border-b border-border bg-bg/80 backdrop-blur flex items-center px-8">
      <h1 className="font-bold text-lg tracking-tight flex-1">Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-muted">
          🔔
        </div>

        <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-bold text-sm">
          {initial.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
