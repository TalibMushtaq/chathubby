// app/dashboard/components/ServersCard.tsx

import Card from "@repo/ui/Card";

interface Server {
  name: string;
  members: string;
  channels: string;
  online: string;
  icon: string;
}

const mockServers: Server[] = [
  {
    name: "Design Hub",
    members: "2,840",
    channels: "12",
    online: "348",
    icon: "🎨",
  },
  {
    name: "Gaming Den",
    members: "18,200",
    channels: "24",
    online: "2,104",
    icon: "🎮",
  },
  {
    name: "Dev Talk",
    members: "5,420",
    channels: "18",
    online: "612",
    icon: "💻",
  },
  {
    name: "Anime Central",
    members: "21,831",
    channels: "31",
    online: "40",
    icon: "✨",
  },
];

export default function ServersCard() {
  return (
    <Card className="p-6 hover:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-sm tracking-tight">Your Servers</div>
          <div className="text-xs text-muted mt-1">4 servers you manage</div>
        </div>

        <button className="text-xs px-3 py-1 rounded-md border border-border bg-surface-2 text-muted hover:text-text">
          View all
        </button>
      </div>

      {/* List */}
      <div className="space-y-1">
        {mockServers.map((server) => (
          <div
            key={server.name}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-2 transition cursor-pointer"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-sm">
              {server.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{server.name}</div>
              <div className="text-xs text-muted">
                {server.members} members · {server.channels} channels
              </div>
            </div>

            {/* Online stat */}
            <div className="text-right">
              <div className="text-sm font-bold text-accent-3">
                ● {server.online}
              </div>
              <div className="text-[10px] text-muted">online</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
