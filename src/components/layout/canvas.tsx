import { Canvas } from "@react-three/fiber";
import {
  Box,
  OrbitControls,
  OrbitControlsProps,
  Preload,
} from "@react-three/drei";
import useStore from "@/store/store";
import {
  ForwardRefExoticComponent,
  MutableRefObject,
  Ref,
  RefAttributes,
  useEffect,
  useRef,
} from "react";
import useRhetoricStore from "@/store/rhetoricStore";
import { Vector3 } from "three";
import { useMousePosition } from "@/hooks/rhetoric/useMousePosition";

export let controlRef: MutableRefObject<
  ForwardRefExoticComponent<
    OrbitControlsProps & RefAttributes<typeof OrbitControls>
  > &
    OrbitControlsProps
>;

const LControl = () => {
  const dom = useStore((state) => state.dom);
  const myUserSend = useRhetoricStore((state) => state.myUserSend);
  useMousePosition();

  controlRef = useRef<typeof OrbitControls & OrbitControlsProps>(
    null
  ) as unknown as typeof controlRef;

  useEffect(() => {
    if (controlRef) {
      dom.current.style["touch-action"] = "none";
      // console.log({ control: control.current });
    }
  }, [dom, controlRef]);

  return (
    <OrbitControls
      onChange={(e) => {
        const { position, rotation } = e.target.object;
        myUserSend && myUserSend([position.x, position.y, position.z]);
      }}
      makeDefault
      // @ts-ignore
      ref={controlRef}
      domElement={dom.current}
    />
  );
};
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom);

  return (
    <Canvas
      // mode='concurrent'
      style={{
        position: "absolute",
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <LControl />
      <Preload all />
      <Box uuid="test" scale={0.1} />
      {children}
    </Canvas>
  );
};

export default LCanvas;
