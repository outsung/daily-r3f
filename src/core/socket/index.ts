import io, { Socket as SocketType } from "socket.io-client";
import * as uuid from "uuid";

// https://tie-video-chat-app.herokuapp.com
const url = "https://tie-video-chat-app.herokuapp.com";
// const url = "http://localhost:5556";

// web token 만들기
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3VuZzk1NDZAZ21haWwuY29tIiwiaWF0IjoxNjY0Nzk0MjQ2LCJleHAiOjMzMjIyMzk0MjQ2fQ.E1nS31RLwhWIYnm95LbRG56s6Zk0rS-2VlvxqeqUvZ4";
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
    // await As
    this.instance?.emit(event, { ...data, token });
  };

  static disconnect = () => Socket.instance?.close();
}
