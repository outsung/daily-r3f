import { useCallback, useEffect } from "react";
import { controlRef } from "@/components/layout/canvas";
import { useUserStore } from "@/store/rhetoric";
import { useWebRTCStore } from "@/store/webRTC";
import { useMyUser } from "../store/user";
import { Euler, Vector3 } from "three";

export function useMyUserMove() {
  const myUser = useMyUser();

  const moveById = useUserStore((state) => state.moveById);
  const send = useWebRTCStore((state) => state.send);

  const onChange = useCallback(
    (event: any) => {
      const { position, rotation } = event.target.object;

      moveById({
        rotation: new Euler(rotation.x, rotation.y, rotation.z),
        position: new Vector3(position.x, position.y, position.z),
        userId: myUser.id,
      });
      send({
        eventName: "userCameraMove",
        payload: {
          position: [position.x, position.y, position.z],
          rotation: [rotation.x, rotation.y, rotation.z],
          userId: myUser.id,
        },
      });
    },
    [myUser.id, moveById, send]
  );

  useEffect(() => {
    controlRef.current.addEventListener("change", onChange);
    return () => controlRef.current.removeEventListener("change", onChange);
  }, [onChange]);
}
