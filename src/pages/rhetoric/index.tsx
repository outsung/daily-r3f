import { useRef } from "react";
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

const RhetoricR3f = dynamic(() => import("@/components/rhetoric/r3f"), {
  ssr: false,
});

function RhetoricDom({ ref }: { ref: RhetoricR3fRef }) {
  useSocket();
  useWebRtc("");

  return (
    <>
      <RhetoricToolbar />
      <RhetoricSidebarLeft />
      <RhetoricSidebarRight />
      <div className="absolute w-full flex justify-center">
        <div
          className="cursor-pointer"
          style={{ backgroundColor: "#FFF" }}
          onClick={() => {
            Socket.emit("joinRoom", { room: "testRoom", email: "testEmail" });
          }}
        >
          join room
        </div>
      </div>
    </>
  );
}

const RhetoricPage = () => {
  const r3fRef = useRef<RhetoricR3fRef>(null);

  return (
    <>
      <RhetoricDom ref={r3fRef} />
      {/* @ts-ignore */}
      <RhetoricR3f r3f ref={r3fRef} />
    </>
  );
};

export default RhetoricPage;
