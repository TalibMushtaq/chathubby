import { Container } from "@repo/ui/Container";

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {value}
      </div>
      <div className="text-sm text-muted mt-2">{label}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-32 scroll-mt-24">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          <StatItem value="2M+" label="Active users" />
          <StatItem value="50K+" label="Communities" />
          <StatItem value="99.9%" label="Uptime SLA" />
          <StatItem value="140+" label="Countries" />
        </div>
      </Container>
    </section>
  );
}
