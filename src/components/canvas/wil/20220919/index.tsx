import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Box,
  TransformControls,
  TransformControlsProps,
} from "@react-three/drei";
import { controlRef } from "@/components/layout/canvas";
import {
  EffectComposer,
  SSAO,
  Selection,
  Outline,
  Select,
} from "@react-three/postprocessing";

import DefaultGizmoHelper from "../../gizmoHelper/DefaultGizmoHelper";

type POSITION = [number, number, number];
export interface BoxWithTransformControlsRef {
  saveScene: () => void;
  loadScene: (boxPositionJSON: string) => void;
}

const BoxWithTransformControls = forwardRef<BoxWithTransformControlsRef, {}>(
  (props, ref) => {
    const [boxListPosition, setBoxListPosition] = useState<POSITION[]>([
      [0, 0, 0],
      [1, 1, 1],
      [-1, -1, -1],
    ]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(1);
    const transformRefs = useRef<TransformControlsProps[]>([]);

    useEffect(() => {
      transformRefs.current.map((transformRef, index) => {
        if (!transformRef) return;

        const onDraggingChanged = (event) => {
          controlRef.current.enabled = !event.value;
        };

        transformRef.addEventListener("dragging-changed", onDraggingChanged);
        return () => {
          transformRef.removeEventListener(
            "dragging-changed",
            onDraggingChanged
          );
        };
      });
    });

    useImperativeHandle(
      ref,
      () => ({
        saveScene: () => {
          // scene.updateMatrixWorld();
          console.log(transformRefs.current);

          // scene.getObjectById(boxRefs.current.uuid)
          navigator.clipboard
            .writeText(
              JSON.stringify(
                transformRefs.current.map((transformRef) => {
                  const { x, y, z } = (transformRef as any).offset;
                  return [x, y, z];
                })
              )
            )
            .then((res) => alert("복사했습니다."))
            .catch((error) => alert("복사에 실패했습니다."));
        },
        loadScene: (boxPositionJSON: string) => {
          setBoxListPosition(JSON.parse(boxPositionJSON));
        },
      }),
      []
    );

    return (
      <>
        <Suspense fallback={null}>
          <Selection>
            {boxListPosition.map((boxPosition, index) => {
              const isSelected = index === selectedBoxIndex;

              return (
                <TransformControls
                  key={index}
                  showZ={isSelected}
                  showX={isSelected}
                  showY={isSelected}
                  enabled={isSelected}
                  position={boxPosition}
                  ref={(ref) => (transformRefs.current[index] = ref as any)}
                >
                  <Select enabled={isSelected}>
                    <Box
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedBoxIndex((prev) =>
                          prev === index ? null : index
                        );
                      }}
                    />
                  </Select>
                </TransformControls>
              );
            })}

            <EffectComposer multisampling={0} autoClear={false}>
              <SSAO
                radius={0.05}
                intensity={150}
                luminanceInfluence={0.5}
                color="black"
              />
              <Outline
                visibleEdgeColor={0xffffff}
                hiddenEdgeColor={0xffffff}
                blur
                edgeStrength={100}
              />
              {/* <SMAA /> */}
            </EffectComposer>
          </Selection>
        </Suspense>
        <DefaultGizmoHelper />
      </>
    );
  }
);

export default BoxWithTransformControls;
