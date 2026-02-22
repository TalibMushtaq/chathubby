import Card from "@repo/ui/Card";
import { Container } from "@repo/ui/Container";

export function PreviewWindow() {
  return (
    <div className="mt-20">
      <Container>
        <Card variant="elevated" className="overflow-hidden rounded-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 bg-surface-2 border-b border-border px-4 py-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-muted">
              ChatHubby — #general
            </span>
          </div>

          {/* Content */}
          <div className="flex h-105 bg-surface">
            {/* Sidebar */}
            <div className="w-52 border-r border-border p-4 space-y-3 text-sm text-muted">
              <div className="text-xs uppercase tracking-wider text-muted">
                Channels
              </div>
              <div className="text-primary font-medium"># general</div>
              <div># gaming</div>
              <div># design</div>
              <div># backend</div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col justify-between p-6">
              {/* Messages */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold">
                    Maya
                    <span className="text-xs text-muted ml-2">
                      Today 2:34 PM
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    Anyone working on something cool this week?
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold">
                    Jordan
                    <span className="text-xs text-muted ml-2">
                      Today 2:36 PM
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    Just shipped realtime chat 🚀
                  </p>
                </div>
              </div>

              {/* Fake input */}
              <div className="mt-6 border border-border bg-surface-2 rounded-lg px-4 py-3 text-sm text-muted">
                Message #general...
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
