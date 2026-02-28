"use client";
import { useState } from "react";
import { api } from "../../app/lib/api";

export default function DMInput({ directChatId }: { directChatId: string }) {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;
    await api.post(`/dm/${directChatId}/message`, {
      content: text,
    });
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <div className="border-t border-white/7 bg-surface px-4 py-3.5 shrink-0">
      <div
        className="
          flex items-center gap-3
          bg-surface-2 border border-white/7 rounded-xl
          px-4 py-0.5
          transition-all duration-200
          focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_rgba(108,99,255,0.08)]
        "
      >
        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="
            flex-1 bg-transparent text-[13px] text-text
            placeholder:text-muted outline-none py-2.5
          "
        />

        {/* Send button */}
        <button
          onClick={send}
          disabled={!text.trim()}
          className="
            w-8 h-8 flex items-center justify-center rounded-lg shrink-0 cursor-pointer
            bg-primary text-white text-[15px]
            transition-all duration-200
            hover:bg-primary-hover hover:shadow-[0_4px_14px_rgba(108,99,255,0.35)] hover:-translate-y-px
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary
            disabled:hover:shadow-none disabled:hover:translate-y-0
          "
        >
          ↑
        </button>
      </div>

      <p className="text-[11px] text-muted/60 mt-1.5 ml-1">
        Press <kbd className="font-mono">Enter</kbd> to send
      </p>
    </div>
  );
}
