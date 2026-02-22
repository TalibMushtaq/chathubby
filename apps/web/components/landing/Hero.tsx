import Button from "@repo/ui/Button";
import { Container } from "@repo/ui/Container";
import { BackgroundBlobs } from "../BackgroundBlobs";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-40 pb-32 text-center noise-overlay">
      <BackgroundBlobs />
      <Container className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs text-primary mb-6">
          Public Beta
        </div>

        {/* Title */}
        <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8">
          Where your{" "}
          <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            community
          </span>{" "}
          lives
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-lg text-muted mb-12">
          Channels, threads, and direct messages — all in one place. Build
          spaces that feel like home.
        </p>

        {/* CTAs */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg">Start for free</Button>
          <Button variant="outline" size="lg">
            Explore communities →
          </Button>
        </div>
      </Container>
    </section>
  );
}
