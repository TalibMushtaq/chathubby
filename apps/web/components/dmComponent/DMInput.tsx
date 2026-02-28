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

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
