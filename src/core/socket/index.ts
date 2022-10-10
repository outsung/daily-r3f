import { useAppStore } from "@/store/app";
import io, { Socket as SocketType } from "socket.io-client";

const url = "https://tie-video-chat-app.herokuapp.com";

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
