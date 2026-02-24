import Card from "@repo/ui/Card";
import Button from "@repo/ui/Button";
import { Container } from "@repo/ui/Container";
import Link from "next/link";

export function CTASection() {
  return (
    <section id="cta" className="py-40 bg-bg scroll-mt-24">
      <Container>
        <Card
          variant="elevated"
          className="relative overflow-hidden p-20 text-center"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-pink-500/10 opacity-60 pointer-events-none" />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Ready to build your community?
            </h2>

            <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
              Free forever for small communities. No credit card required.
            </p>

            <Link href={"/auth"}>
              <Button size="lg">Create your server →</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
