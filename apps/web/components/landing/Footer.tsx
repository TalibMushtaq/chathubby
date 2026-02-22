import { Container } from "@repo/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-16 bg-bg">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left */}
          <div>
            <div className="text-lg font-semibold mb-2">ChatHubby</div>
            <p className="text-sm text-muted max-w-sm">
              A modern space for communities to connect, collaborate, and grow
              together.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 text-sm text-muted">
            <div className="space-y-3">
              <div className="text-text font-medium mb-2">Product</div>
              <a href="#" className="block hover:text-text transition">
                Features
              </a>
              <a href="#" className="block hover:text-text transition">
                Pricing
              </a>
              <a href="#" className="block hover:text-text transition">
                Updates
              </a>
            </div>

            <div className="space-y-3">
              <div className="text-text font-medium mb-2">Company</div>
              <a href="#" className="block hover:text-text transition">
                About
              </a>
              <a href="#" className="block hover:text-text transition">
                Privacy
              </a>
              <a href="#" className="block hover:text-text transition">
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border text-sm text-muted text-center md:text-left">
          © {new Date().getFullYear()} ChatHubby. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
