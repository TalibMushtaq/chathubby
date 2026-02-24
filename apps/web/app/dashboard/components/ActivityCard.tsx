// app/dashboard/components/ActivityCard.tsx

import Card from "@repo/ui/Card";

interface Activity {
  user: string;
  message: string;
  time: string;
  dotColor: string;
  avatar: string;
}

const mockActivity: Activity[] = [
  {
    user: "Maya",
    message: 'posted in #design-feedback — "Love the new layout! 🔥"',
    time: "2 min ago · Design Hub",
    dotColor: "bg-primary",
    avatar: "M",
  },
  {
    user: "Jordan",
    message: "joined Gaming Den",
    time: "8 min ago · Gaming Den",
    dotColor: "bg-accent-3",
    avatar: "J",
  },
  {
    user: "Alex K.",
    message: "started a voice channel in #gaming-lounge",
    time: "15 min ago · Gaming Den",
    dotColor: "bg-accent-2",
    avatar: "A",
  },
  {
    user: "Riley",
    message: "shared a file in #resources",
    time: "34 min ago · Dev Talk",
    dotColor: "bg-warn",
    avatar: "R",
  },
  {
    user: "Sam",
    message: "reacted 🎉 to your message in #announcements",
    time: "1 hr ago · Anime Central",
    dotColor: "bg-muted",
    avatar: "S",
  },
];

export default function ActivityCard() {
  return (
    <Card className="p-6 hover:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-sm tracking-tight">
            Recent Activity
          </div>
          <div className="text-xs text-muted mt-1">
            Latest events across servers
          </div>
        </div>

        <button className="text-xs px-3 py-1 rounded-md border border-border bg-surface-2 text-muted hover:text-text">
          Mark all read
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-1">
        {mockActivity.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-surface-2 transition cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-xs font-bold">
              {item.avatar}
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <div className="text-sm leading-snug">
                <strong className="font-medium">{item.user}</strong>{" "}
                {item.message}
              </div>
              <div className="text-xs text-muted mt-1">{item.time}</div>
            </div>

            {/* Dot */}
            <div className={`w-2 h-2 rounded-full mt-2 ${item.dotColor}`} />
          </div>
        ))}
      </div>
    </Card>
  );
}
