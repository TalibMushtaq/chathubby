import Card from "@repo/ui/Card";

type Trend = "up" | "down";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  icon: React.ReactNode;
  accent?: "primary" | "accent2" | "accent3";
}

export default function StatCard({
  label,
  value,
  delta,
  trend,
  icon,
}: StatCardProps) {
  return (
    <Card className="p-6 hover:border-white/10 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-muted font-semibold">
          {label}
        </span>

        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-sm">
          {icon}
        </div>
      </div>

      <div className="text-3xl font-extrabold tracking-tight mb-2">{value}</div>

      <div
        className={`text-xs font-medium flex items-center gap-1 ${
          trend === "up" ? "text-accent-3" : "text-accent-2"
        }`}
      >
        {trend === "up" ? "↑" : "↓"} {delta}
        <span className="text-muted font-normal">vs last period</span>
      </div>
    </Card>
  );
}
