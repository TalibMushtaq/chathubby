// app/dashboard/components/MembersCard.tsx

import Card from "@repo/ui/Card";

interface Member {
  name: string;
  status: string;
  state: "online" | "idle" | "offline";
  avatar: string;
}

const members: Member[] = [
  {
    name: "Maya Chen",
    status: "Playing Minecraft",
    state: "online",
    avatar: "M",
  },
  {
    name: "Jordan Lee",
    status: "In #gaming-lounge 🎙️",
    state: "online",
    avatar: "J",
  },
  { name: "Alex Kim", status: "Browsing", state: "online", avatar: "A" },
  { name: "Riley Park", status: "Idle — 10 mins", state: "idle", avatar: "R" },
  { name: "Sam Torres", status: "Idle — 32 mins", state: "idle", avatar: "S" },
  {
    name: "Taylor Wu",
    status: "Last seen 2hr ago",
    state: "offline",
    avatar: "T",
  },
];

function statusColor(state: Member["state"]) {
  switch (state) {
    case "online":
      return "bg-accent-3";
    case "idle":
      return "bg-warn";
    case "offline":
      return "bg-muted";
  }
}

export default function MembersCard() {
  return (
    <Card className="p-6 hover:border-white/10">
      {/* Header */}
      <div className="mb-6">
        <div className="font-bold text-sm tracking-tight">Members Online</div>
        <div className="text-xs text-muted mt-1">3,104 across your servers</div>
      </div>

      {/* Members */}
      <div className="space-y-1">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-2 transition cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-xs font-bold">
              {member.avatar}
              <div
                className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-surface ${statusColor(
                  member.state,
                )}`}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{member.name}</div>
              <div className="text-xs text-muted truncate">{member.status}</div>
            </div>

            {/* Message button (hidden until hover) */}
            <div className="opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 text-center">
        <button className="text-xs px-3 py-1 rounded-md border border-border bg-surface-2 text-muted hover:text-text">
          See all members →
        </button>
      </div>
    </Card>
  );
}
