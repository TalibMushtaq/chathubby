"use client";

import DMMessages from "../../../../components/dmComponent/DMMessages";
import DMInput from "../../../../components/dmComponent/DMInput";
import DMChatTopbar from "../../components/DMChatTopbar";
import { useDMSidebar } from "../layout";

export default function DirectChatClient({
  directChatId,
}: {
  directChatId: string;
}) {
  const { openSidebar } = useDMSidebar();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Mobile-only topbar: ← back | username | ☰ sidebar */}
      <DMChatTopbar directChatId={directChatId} onMenuOpen={openSidebar} />

      <DMMessages directChatId={directChatId} />
      <DMInput directChatId={directChatId} />
    </div>
  );
}
