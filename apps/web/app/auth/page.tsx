// app/auth/page.tsx

import AuthCard from "./AuthCard";
import Logo from "../../components/icons/Logo";

export default async function AuthPage() {
  // Later:
  // - read cookies()
  // - redirect if logged in

  return (
    <div className="min-h-screen bg-bg text-white flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-surface border-r border-white/10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-150 h-150 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-100 h-100 bg-blue-600/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold">
            <Logo />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            ChatHubby
          </span>
        </div>

        {/* Marketing Copy */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold leading-tight">
            Conversations,
            <br />
            <span className="bg-line-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              reimagined.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-sm text-sm leading-relaxed">
            Real-time rooms. Private DMs. Clean interface. Built for people who
            value focus.
          </p>
        </div>

        {/* Social Proof */}
        <div className="relative z-10 bg-surface-2 border border-white/10 rounded-xl p-5 max-w-sm">
          <p className="text-sm italic mb-4">
            “It feels faster and cleaner than anything else we tried.”
          </p>
          <div className="text-xs text-gray-400">— Early Beta User</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-120 flex flex-col justify-center px-8 py-16">
        <AuthCard />
      </div>
    </div>
  );
}
