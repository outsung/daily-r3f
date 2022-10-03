import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { RhetoricR3fRef } from "@/components/rhetoric/r3f";
import {
  RhetoricSidebarLeft,
  RhetoricSidebarRight,
} from "@/components/rhetoric/dom/sidebar";
import { RhetoricToolbar } from "@/components/rhetoric/dom/toolbar";
import { WebRTC } from "@/core/webrtc";
import { useSocket } from "@/hooks/socket";
import { useWebRtc } from "@/hooks/webrtc";
import Socket from "@/core/socket";
import { useSelect } from "@react-three/drei";
import useRhetoricStore, { User } from "@/store/rhetoricStore";
import { Vector3 } from "three";
import { stringToColor } from "@/helpers/stringToColor";

const RhetoricR3f = dynamic(() => import("@/components/rhetoric/r3f"), {
  ssr: false,
});

function RhetoricDom({ ref }: { ref: RhetoricR3fRef }) {
  // const webRTCRef = useRef(new WebRTC());

  useSocket();

  const { send, users } = useWebRtc("");

  const setUsers = useRhetoricStore((state) => state.setUsers);
  const setMyUserSend = useRhetoricStore((state) => state.setMyUserSend);

  useEffect(() => {
    setMyUserSend(send);
    setUsers(
      users.map<User>((user) => ({
        finger: "Spatula",
        id: user.socketId,
        color: stringToColor(user.socketId),
        position: new Vector3(...user.position),
        rotation: new Vector3(0, 0, 0),
        far: 1000,
        filmGauge: 35,
        filmOffset: 0,
        focus: 10,
        fov: 75,
      }))
    );
  }, [send, users]);

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
