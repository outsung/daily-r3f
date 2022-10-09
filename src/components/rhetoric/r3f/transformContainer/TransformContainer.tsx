import { useR3fObjectStore } from "@/store/rhetoric";
import { useWebRTCStore } from "@/store/webRTC";
import { R3fObject, R3fObjectId } from "@/types/r3fObject";
import { TransformControls } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Camera, Group, Object3D, Vector3 } from "three";

interface TransformContainerProps {
  enabled: boolean;
  children: ReactElement<Object3D<Event>, string>;
  r3fObject: R3fObject;
}
export function TransformContainer({
  children,
  enabled,
  r3fObject,
}: TransformContainerProps) {
  const moveById = useR3fObjectStore((state) => state.moveById);
  const send = useWebRTCStore((state) => state.send);
  const ref = useRef<any>({} as Group);

  return useMemo(
    () => (
      <TransformControls
        ref={ref}
        mode="translate"
        key={r3fObject.id}
        showZ={enabled}
        showX={enabled}
        showY={enabled}
        enabled={enabled}
        position={r3fObject.position}
        onObjectChange={(e) => {
          const newPosition = new Vector3(
            e.target.positionStart.x + e.target.offset.x,
            e.target.positionStart.y + e.target.offset.y,
            e.target.positionStart.z + e.target.offset.z
          );

          send({
            eventName: "r3fObjectTransformPosition",
            payload: {
              position: [newPosition.x, newPosition.y, newPosition.z],
              r3fObjectId: r3fObject.id,
            },
          });
          moveById({ position: newPosition, r3fObjectId: r3fObject.id });
        }}
      >
        <Select enabled={enabled}>{children}</Select>
      </TransformControls>
    ),
    [enabled]
  );
}
