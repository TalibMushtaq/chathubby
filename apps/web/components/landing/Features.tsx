import Card from "@repo/ui/Card";
import { Container } from "@repo/ui/Container";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Card
      variant="elevated"
      className="p-8 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-3xl mb-5">{icon}</div>

      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </Card>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-36 bg-bg scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary uppercase tracking-widest mb-4">
            Why ChatHubby
          </p>

          <h2 className="text-4xl font-extrabold tracking-tight">
            Everything your community needs
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="💬"
            title="Channels & Threads"
            description="Organize conversations by topic and keep discussions focused with threads."
          />
          <FeatureCard
            icon="📩"
            title="Direct Messages"
            description="Private one-on-one or group conversations with strong encryption."
          />
          <FeatureCard
            icon="⚡"
            title="Bots & Integrations"
            description="Connect GitHub, Spotify, and 200+ tools directly into your server."
          />
          <FeatureCard
            icon="🛡️"
            title="Powerful Moderation"
            description="Roles, permissions, and automated tools to keep your space safe."
          />
          <FeatureCard
            icon="🎙️"
            title="Voice & Video"
            description="Jump into voice channels or start instant video calls."
          />
          <FeatureCard
            icon="🎨"
            title="Fully Customizable"
            description="Themes, emoji, banners, and more to make your space yours."
          />
        </div>
      </Container>
    </section>
  );
}
