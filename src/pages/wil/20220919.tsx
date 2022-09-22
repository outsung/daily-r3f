import {
  forwardRef,
  MutableRefObject,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import {
  Box,
  TransformControls,
  TransformControlsProps,
} from "@react-three/drei";
import { ReadableFolder, readFolder } from "@/helpers/fs/readFolder";
import { GetStaticProps } from "next";
import { DOM as WILIndex } from ".";
import { useThree } from "@react-three/fiber";
import { controlRef } from "@/components/layout/canvas";
import {
  EffectComposer,
  SSAO,
  Selection,
  Outline,
  Select,
} from "@react-three/postprocessing";
import { ObjectLoader } from "three";

const DefaultGizmoHelper = dynamic(
  () => import("@/components/canvas/gizmoHelper/DefaultGizmoHelper"),
  {
    ssr: false,
  }
);

const DOM = ({
  paths,
  R3FRef,
}: PageProps & { R3FRef: MutableRefObject<R3FRef> }) => {
  const [forLoadSceneInputValue, setForLoadSceneInputValue] = useState("");

  return (
    <div className="absolute">
      <div>
        <WILIndex paths={paths} />
      </div>

      <div>9월 19일 ~ 9월 25일</div>
      <ul>
        <li>박스 위치 조정 및 저장, 불러오기</li>
        <li>https://threejs.org/examples/#webgl_geometry_spline_editor</li>
      </ul>

      <div>메뉴</div>
      <div className="flex flex-col items-start">
        <button
          onClick={() => {
            R3FRef.current.saveScene();
          }}
        >
          저장하기 (문자열)
        </button>
        <input
          onChange={(value) => setForLoadSceneInputValue(value.target.value)}
        ></input>
        <button
          onClick={() => {
            alert("기존 정보는 사라집니다.");
            R3FRef.current.loadScene(forLoadSceneInputValue);
          }}
        >
          불러오기
        </button>
      </div>
    </div>
  );
};

type POSITION = [number, number, number];
interface R3FRef {
  saveScene: () => void;
  loadScene: (sceneJSON: string) => void;
}
const R3F = forwardRef<R3FRef>((_, ref) => {
  const { scene } = useThree();

  const [boxListPosition, setBoxListPosition] = useState<POSITION[]>([
    [0, 0, 0],
    [1, 1, 1],
    [-1, -1, -1],
  ]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(1);
  const transformRefs = useRef<TransformControlsProps[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      saveScene: () => {
        scene.updateMatrixWorld();
        console.log(JSON.stringify(scene.toJSON()));
      },
      loadScene: (sceneJSON: string) => {
        scene.clear();
        scene.add(new ObjectLoader().parse(JSON.parse(sceneJSON)));
      },
    }),
    []
  );

  useEffect(() => {
    transformRefs.current.map((transformRef) => {
      if (!transformRef) return;

      const callback = (event) => (controlRef.current.enabled = !event.value);
      transformRef.addEventListener("dragging-changed", callback);
      return () =>
        transformRef.removeEventListener("dragging-changed", callback);
    });
  });

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
});
interface PageProps {
  paths: string[];
}
const Page = ({ paths }: PageProps) => {
  const ref = useRef<R3FRef>();
  return (
    <>
      <DOM paths={paths} R3FRef={ref} />
      {/* @ts-ignore */}
      <R3F r3f ref={ref} />
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const paths = await readFolder(ReadableFolder.WIL_PROJECT);
  return {
    props: {
      title: "this week i learned about",
      paths: paths
        .map((path) => path.split(".")[0])
        .filter((path) => path !== "index"),
    },
  };
};
