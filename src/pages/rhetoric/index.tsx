import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { RhetoricR3fRef } from "@/components/rhetoric/r3f";
import {
  RhetoricSidebarLeft,
  RhetoricSidebarRight,
} from "@/components/rhetoric/dom/sidebar";
import { RhetoricToolbar } from "@/components/rhetoric/dom/toolbar";
import { useSocket } from "@/hooks/socket";
import { useWebRtc } from "@/hooks/webrtc";
import Socket from "@/core/socket";
import { useAppStore } from "@/store/app";
import { Login } from "@/components/rhetoric/dom/login";

const RhetoricR3f = dynamic(() => import("@/components/rhetoric/r3f"), {
  ssr: false,
});

function RhetoricDom({ ref }: { ref: RhetoricR3fRef }) {
  useSocket();
  useWebRtc();

  useEffect(() => {
    Socket.emit("joinRoom", { room: "testRoom", email: "" });
  }, []);

  return (
    <>
      <RhetoricToolbar />
      <RhetoricSidebarLeft />
      <RhetoricSidebarRight />
    </>
  );
}

const RhetoricPage = () => {
  const r3fRef = useRef<RhetoricR3fRef>(null);
  const token = useAppStore((state) => state.token);

  if (!token)
    return (
      <>
        <Login />
      </>
    );

  return (
    <>
      <RhetoricDom ref={r3fRef} />
      {/* @ts-ignore */}
      <RhetoricR3f r3f ref={r3fRef} />
    </>
  );
};

export default RhetoricPage;
