// components/dm/DMMessages.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "../../app/lib/api";
import { socket } from "../../app/lib/socket";

export default function DMMessages({ directChatId }: { directChatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`/direct/${directChatId}/messages`)
      .then((res) => setMessages(res.data.messages));

    socket.emit("directChat:join", { directChatId });

    socket.on("message:new", (msg) => {
      if (msg.directChatId === directChatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("message:edited", (update) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === update.messageId ? { ...m, content: update.content } : m,
        ),
      );
    });

    socket.on("message:deleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, content: "Message deleted" } : m,
        ),
      );
    });

    return () => {
      socket.off("message:new");
      socket.off("message:edited");
      socket.off("message:deleted");
    };
  }, [directChatId]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className="text-sm">
          <span className="font-semibold mr-2">{msg.senderId}</span>
          {msg.content}
        </div>
      ))}
    </div>
  );
}
