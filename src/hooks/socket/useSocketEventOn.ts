import Socket from "@/core/socket";
import { SocketEvent } from "@/types/socket";
import { useEffect } from "react";

export default function useSocketEventOn<E extends keyof SocketEvent>(
  event: E,
  cb: (d: SocketEvent[E]) => void
) {
  useEffect(() => {
    console.log("useSocketEventOn", event, !!Socket.instance);
    Socket.instance?.on<keyof SocketEvent>(event, cb);

    return () => {
      Socket.instance?.off<keyof SocketEvent>(event, cb);
    };
  }, []);
}
