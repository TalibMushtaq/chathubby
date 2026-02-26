// components/dm/DMHeader.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "../../app/lib/api";

export default function DMHeader({ directChatId }: { directChatId: string }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get(`/direct/${directChatId}/meta`).then((res) => {
      setUser(res.data.otherUser);
    });
  }, [directChatId]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
      <div className="h-10 w-10 rounded-full bg-purple-500" />
      <div>
        <div className="font-semibold">{user.username}</div>
        <div className="text-sm text-white/50">Online</div>
      </div>
    </div>
  );
}
