import Socket from "@/core/socket";
import { useUserStore } from "@/store/rhetoric";
import { useSocketStore } from "@/store/socket";
import { useEffect } from "react";
import { Euler, Vector3 } from "three";

export function useSocket() {
  const setMySocketId = useSocketStore((state) => state.setMySocketId);
  const add = useUserStore((state) => state.add);

  useEffect(() => {
    Socket.init();

    Socket.instance?.on("connect_error", (err) => {
      console.log("connect_error!!", err.name, err.message);
    });
    Socket.instance.on("connect", () => {
      console.log("setMySocketId : ", Socket.instance.id);
      setMySocketId(Socket.instance.id);
      add({
        user: {
          id: Socket.instance.id,
          name: "나",
          rotation: new Euler(0, 0, 0),
          position: new Vector3(0, 0, 5),
          handPosition: new Vector3(0.3, 0.1, 4),
          focusedR3fObjectIds: [],
        },
      });
    });

    return () => {
      Socket.disconnect();
    };
  }, []);
}
