import { useR3fObjectStore } from "@/store/rhetoric";
import { R3fObject } from "@/types/r3fObject";
import { TransformControls } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { ReactElement } from "react";
import { Object3D, Vector3 } from "three";

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

  return (
    <TransformControls
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

        moveById({ position: newPosition, r3fObjectId: r3fObject.id });
      }}
    >
      <Select enabled={enabled}>{children}</Select>
    </TransformControls>
  );
}
