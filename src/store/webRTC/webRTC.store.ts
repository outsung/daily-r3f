import { SendWebRTCProps } from "@/hooks/webrtc/useSetSendWebRTC";
import { WebRTCEventUnion } from "@/types/webRTC";
import create from "zustand";

interface WebRTCStore {
  send: <E extends WebRTCEventUnion>(props: SendWebRTCProps<E>) => void;
  setSend: (send: WebRTCStore["send"]) => void;
}
export const useWebRTCStore = create<WebRTCStore>((set) => ({
  send: null,
  setSend: (send: WebRTCStore["send"]) => set((prev) => ({ ...prev, send })),
}));
