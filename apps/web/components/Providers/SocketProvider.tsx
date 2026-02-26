"use client";

import { useEffect } from "react";
import { socket } from "../../app/lib/socket";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
