import { useUserStore } from "@/store/rhetoric";
import { useWebRTCStore } from "@/store/webRTC";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";
import { useMyUser } from "../store/user";

export function useMyUserHandMove() {
  const myUser = useMyUser();

  const handMoveById = useUserStore((state) => state.handMoveById);
  const send = useWebRTCStore((state) => state.send);

  const [origin, direction] = useMemo(
    () => [new Vector3(0, 0, 0), new Vector3(0, 0, 0)],
    []
  );

  useFrame(({ mouse, camera }) => {
    origin.setFromMatrixPosition(camera.matrixWorld);

    direction
      .set(mouse.x, mouse.y, 0.5)
      .unproject(camera)
      .sub(origin)
      .normalize();

    const handPosition = camera.position
      .clone()
      .addScaledVector(direction, 0.8);

    handMoveById({ handPosition, userId: myUser.id });

    send({
      eventName: "userMouseMove",
      payload: {
        handPosition: [handPosition.x, handPosition.y, handPosition.z],
        userId: myUser.id,
      },
    });
  });
}
