// components/dm/DMInput.tsx
"use client";

import { useState } from "react";
import { api } from "../../app/lib/api";

export default function DMInput({ directChatId }: { directChatId: string }) {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;

    await api.post(`/direct/${directChatId}/message`, {
      content: text,
    });

    setText("");
  };

  return (
    <div className="border-t border-white/10 p-4 flex gap-3">
      <input
        className="flex-1 rounded-md bg-white/5 px-4 py-2 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={send} className="rounded-md bg-purple-600 px-4 py-2">
        Send
      </button>
    </div>
  );
}
