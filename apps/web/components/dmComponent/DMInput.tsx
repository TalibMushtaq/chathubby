"use client";
import { useRef, useState } from "react";
import { api } from "../../app/lib/api";

export default function DMInput({ directChatId }: { directChatId: string }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const send = async () => {
    if (!text.trim()) return;
    await api.post(`/dm/${directChatId}/message`, { content: text });
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="border-t border-white/7 bg-surface px-4 py-3.5 shrink-0">
      <div
        className="
          flex items-end gap-3
          bg-surface-2 border border-white/7 rounded-xl
          px-4 py-2
          transition-all duration-200
          focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_rgba(108,99,255,0.08)]
        "
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Type a message..."
          rows={1}
          className="
            flex-1 bg-transparent text-[13px] text-text
            placeholder:text-muted outline-none py-1.5 resize-none
            leading-relaxed overflow-y-auto
          "
          style={{ maxHeight: "160px" }}
        />

        {/* Send button */}
        <button
          onClick={send}
          disabled={!text.trim()}
          className="
            w-8 h-8 flex items-center justify-center rounded-lg shrink-0 cursor-pointer mb-0.5
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
        <kbd className="font-mono">Enter</kbd> to send &nbsp;·&nbsp;{" "}
        <kbd className="font-mono">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
