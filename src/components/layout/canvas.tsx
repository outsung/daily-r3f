import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrbitControlsProps, Preload } from "@react-three/drei";
import useStore from "@/store/store";
import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
} from "react";

export let controlRef: MutableRefObject<
  ForwardRefExoticComponent<
    OrbitControlsProps & RefAttributes<typeof OrbitControls>
  > &
    OrbitControlsProps
>;

const LControl = () => {
  const dom = useStore((state) => state.dom);

  controlRef = useRef<typeof OrbitControls & OrbitControlsProps>(
    null
  ) as unknown as typeof controlRef;

  useEffect(() => {
    if (controlRef) {
      dom.current.style["touch-action"] = "none";
    }
  }, [dom, controlRef]);

  return (
    <OrbitControls
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
      style={{
        position: "absolute",
        backgroundColor: "#F5E1D7",
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} />
      <ambientLight />

      <LControl />
      <Preload all />

      {children}
    </Canvas>
  );
};

export default LCanvas;
