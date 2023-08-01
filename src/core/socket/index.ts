import { useAppStore } from "@/store/app";
import io, { Socket as SocketType } from "socket.io-client";

const url = "https://port-0-tie-video-chat-server-eu1k2llkrslzb2.sel4.cloudtype.app";

export default class Socket {
  static instance: null | SocketType = null;

  static init = () => {
    this.instance = io(url, {
      forceNew: true,
      timeout: 5000,
      transports: ["websocket"],
      path: "/chat",
    });
  };

  static emit = async (event: string, data: any) => {
    const { getState } = useAppStore;
    const { token } = getState();

    this.instance?.emit(event, { ...data, token });
  };

  static disconnect = () => Socket.instance?.close();
}
