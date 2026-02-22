import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { PreviewWindow } from "../components/landing/PreviewWindow";
import { StatsSection } from "../components/landing/Stats";
import { FeaturesSection } from "../components/landing/Features";
import { CTASection } from "../components/landing/CTA";
import { Footer } from "../components/landing/Footer";

export default function HomePage() {
  return (
    <main className="bg-bg text-text">
      <Navbar />

      <Hero />

      <PreviewWindow />

      <StatsSection />

      <FeaturesSection />

      <CTASection />

      <Footer />
    </main>
  );
}
