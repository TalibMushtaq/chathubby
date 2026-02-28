"use client";

import { useEffect, useState } from "react";
import { api } from "../../app/lib/api";
import { useRouter } from "next/navigation";
import NewDMModal from "./NewDMModel";

export default function DMSidebar() {
  const [inbox, setInbox] = useState<any[]>([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("/dm/inbox").then((res) => {
      setInbox(res.data.inbox);
    });
  }, []);

  return (
    <div className="relative h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Messages</h3>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-green-500 text-white w-8 h-8"
        >
          +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {inbox.map((chat) => (
          <div
            key={chat.directChatId}
            onClick={() => router.push(`/dashboard/dm/${chat.directChatId}`)}
            className="cursor-pointer p-3 hover:bg-white/5"
          >
            {chat.otherUser.username}
          </div>
        ))}
      </div>

      {open && <NewDMModal onClose={() => setOpen(false)} />}
    </div>
  );
}
