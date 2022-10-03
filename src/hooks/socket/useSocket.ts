import Socket from "@/core/socket";
import { useEffect } from "react";

export function useSocket() {
  useEffect(() => {
    Socket.init();

    Socket.instance?.on("connect_error", (err) => {
      console.log("connect_error!!", err.name, err.message);
    });

    return () => {
      Socket.disconnect();
    };
  }, []);
}
