"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "../../app/lib/api";
import { socket } from "../../app/lib/socket";

export default function DMMessages({ directChatId }: { directChatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function load() {
      const res = await api.get(`/dm/${directChatId}/messages`);
      setMessages(res.data.messages);
    }
    load();

    socket.emit("directChat:join", { directChatId });
    socket.on("message:new", (msg) => {
      if (msg.directChatId === directChatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.emit("directChat:leave", { directChatId });
      socket.off("message:new");
    };
  }, [directChatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1 bg-bg">
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          <div
            className="w-12 h-12 rounded-[14px] bg-primary/10 border border-primary/20
            flex items-center justify-center text-2xl"
          >
            💬
          </div>
          <p className="text-[13px] text-muted leading-relaxed">
            No messages yet.
            <br />
            Say hello!
          </p>
        </div>
      )}

      {messages.map((m, i) => {
        const isFirst = i === 0 || messages[i - 1]?.senderId !== m.senderId;
        const letter = m.senderId?.[0]?.toUpperCase() ?? "?";

        return (
          <div
            key={m.id}
            style={{ animationDelay: `${Math.min(i * 20, 300)}ms` }}
            className="flex items-end gap-2.5 group animate-[fadeSlideIn_0.25s_ease_both] [animation-fill-mode:both]"
          >
            {/* Avatar — only on first in a group */}
            <div
              className={`w-7 h-7 rounded-lg shrink-0 mb-0.5 flex items-center justify-center
              text-[11px] font-bold bg-linear-to-br from-surface-2 to-surface-3
              border border-white/7 text-muted transition-opacity duration-200
              ${isFirst ? "opacity-100" : "opacity-0"}`}
            >
              {letter}
            </div>

            {/* Bubble */}
            <div className="flex flex-col gap-0.5 max-w-[65%]">
              {isFirst && (
                <span className="text-[11px] text-muted ml-1 mb-0.5">
                  {m.senderId}
                </span>
              )}
              <div
                className="
                  px-4 py-2.5 rounded-[14px] rounded-bl-sm text-[13px] leading-relaxed
                  bg-surface-2 border border-white/6 text-text
                  transition-all duration-150
                  group-hover:border-white/10
                "
              >
                {m.content}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
