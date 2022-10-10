import { useWebRTCStore } from "@/store/webRTC";
import { WebRTCEvent, WebRTCEventUnion } from "@/types/webRTC";

export interface SendWebRTCProps<E extends WebRTCEventUnion> {
  eventName: E;
  payload: WebRTCEvent[E];
}

interface UseSetSendWebRTCProps {
  send: (data: string) => void;
}
/**
 * @summary "set" send event use webRTC
 * @description
 * - webRTCStore에 send 함수를 설정 해주는 훅이다.
 * - webRTC 연결한 후 webRTCStore에 send를 이용해서 webRTC 이벤트를 전송한다.
 */
export function useSetSendWebRTC({ send }: UseSetSendWebRTCProps) {
  const setSend = useWebRTCStore((state) => state.setSend);
  setSend((props) => send(JSON.stringify(props)));
}
