import Button from "@repo/ui/Button";
import { Container } from "@repo/ui/Container";
import Logo from "../icons/Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <Logo className="w-12 h-12 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight">ChatHubby</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-sm text-muted">
            <a
              href="#features"
              className="relative text-muted transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </a>
            <a
              href="#stats"
              className="relative text-muted transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Community
            </a>
            <a
              href="#cta"
              className="relative text-muted transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Server
            </a>
            <a
              href="#"
              className="relative text-muted transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Docs
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
