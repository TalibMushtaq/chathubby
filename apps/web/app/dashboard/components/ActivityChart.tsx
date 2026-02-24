// app/dashboard/components/ActivityChart.tsx

import Card from "@repo/ui/Card";

export default function ActivityChart() {
  return (
    <Card className="col-span-2 p-6 hover:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-sm tracking-tight">
            Message Activity
          </div>
          <div className="text-xs text-muted mt-1">
            Messages sent across all servers
          </div>
        </div>

        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1 rounded-md border border-border bg-surface-2 text-muted hover:text-text">
            24h
          </button>
          <button className="px-3 py-1 rounded-md border border-border bg-surface-3 text-text">
            7d
          </button>
          <button className="px-3 py-1 rounded-md border border-border bg-surface-2 text-muted hover:text-text">
            30d
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-40 relative">
        <svg
          viewBox="0 0 620 160"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="40"
            x2="620"
            y2="40"
            stroke="rgba(255,255,255,0.05)"
          />
          <line
            x1="0"
            y1="80"
            x2="620"
            y2="80"
            stroke="rgba(255,255,255,0.05)"
          />
          <line
            x1="0"
            y1="120"
            x2="620"
            y2="120"
            stroke="rgba(255,255,255,0.05)"
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity="0.25"
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Area */}
          <path
            d="M0,110 C40,105 80,85 120,70 C160,55 200,90 240,75 C280,60 320,30 360,45 C400,60 440,40 480,25 C510,14 550,30 620,20 L620,160 L0,160 Z"
            fill="url(#chartGrad)"
          />

          {/* Line */}
          <path
            d="M0,110 C40,105 80,85 120,70 C160,55 200,90 240,75 C280,60 320,30 360,45 C400,60 440,40 480,25 C510,14 550,30 620,20"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted mt-3 px-1">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </Card>
  );
}
