// app/dashboard/components/ActionsCard.tsx

import Card from "@repo/ui/Card";

interface Action {
  icon: string;
  label: string;
  sub: string;
}

const actions: Action[] = [
  { icon: "📢", label: "Announce", sub: "Post to all channels" },
  { icon: "🎙️", label: "Voice Room", sub: "Start a voice call" },
  { icon: "🛡️", label: "Moderation", sub: "Review flags & bans" },
  { icon: "🤖", label: "Manage Bots", sub: "3 bots active" },
  { icon: "🎟️", label: "Invite Link", sub: "Generate & share" },
  { icon: "📈", label: "Analytics", sub: "Deep dive stats" },
];

export default function ActionsCard() {
  return (
    <Card className="p-6 hover:border-white/10">
      {/* Header */}
      <div className="mb-6">
        <div className="font-bold text-sm tracking-tight">Quick Actions</div>
        <div className="text-xs text-muted mt-1">Jump into common tasks</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <div
            key={action.label}
            className="bg-surface-2 border border-border rounded-xl p-4 cursor-pointer hover:bg-surface-3 hover:-translate-y-0.5 transition"
          >
            <div className="text-xl mb-3">{action.icon}</div>

            <div className="text-sm font-medium leading-tight">
              {action.label}
            </div>

            <div className="text-xs text-muted mt-1">{action.sub}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
