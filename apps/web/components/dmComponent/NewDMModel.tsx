"use client";

import { useRouter } from "next/navigation";
import { api } from "../../app/lib/api";
import UserSearch, { User } from "../search/UserSearch";

export default function NewDMModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleStartDM = async (user: User) => {
    try {
      const res = await api.post(`/dm/start-dm/${user.id}`);
      const directChatId = res.data.chat.id;

      onClose();
      router.push(`/dashboard/dm/${directChatId}`);
    } catch (err) {
      console.error("Failed to start DM");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-bg w-96 p-4 rounded-lg">
        <h3 className="mb-4 font-semibold">Start New Chat</h3>

        <UserSearch onSelect={handleStartDM} />

        <button onClick={onClose} className="mt-4 text-sm text-white/50">
          Close
        </button>
      </div>
    </div>
  );
}
