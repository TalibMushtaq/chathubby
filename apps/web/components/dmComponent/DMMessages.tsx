"use client";

import { useEffect, useState } from "react";
import { api } from "../../app/lib/api";
import { socket } from "../../app/lib/socket";

export default function DMMessages({ directChatId }: { directChatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

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

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.senderId}</strong>: {m.content}
        </div>
      ))}
    </div>
  );
}
