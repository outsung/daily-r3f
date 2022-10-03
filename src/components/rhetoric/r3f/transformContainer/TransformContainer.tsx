import { controlRef } from "@/components/layout/canvas";
import { Rhetoric } from "@/core/rhetoric/Rhetoric";
import useRhetoricStore from "@/store/rhetoricStore";
import { TransformControls, TransformControlsProps } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { ReactElement, useEffect, useRef } from "react";
import { Object3D, Vector3 } from "three";

interface TransformContainerProps {
  enabled: boolean;
  children: ReactElement<Object3D<Event>, string>;
  rhetoric: Rhetoric;
}
export function TransformContainer({
  children,
  enabled,
  rhetoric,
}: TransformContainerProps) {
  const setTree = useRhetoricStore((state) => state.setTree);

  return (
    <TransformControls
      mode="translate"
      key={rhetoric.id}
      showZ={enabled}
      showX={enabled}
      showY={enabled}
      enabled={enabled}
      position={rhetoric.position}
      onObjectChange={(e) => {
        const newPosition = new Vector3(
          e.target.positionStart.x + e.target.offset.x,
          e.target.positionStart.y + e.target.offset.y,
          e.target.positionStart.z + e.target.offset.z
        );

        setTree((tree) =>
          tree.map((t) =>
            t.id === rhetoric.id ? { ...t, position: newPosition } : t
          )
        );
      }}
    >
      <Select enabled={enabled}>{children}</Select>
    </TransformControls>
  );
}
