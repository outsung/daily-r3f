import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrbitControlsProps, Preload } from "@react-three/drei";
import useStore from "@/helpers/store";
import {
  ForwardRefExoticComponent,
  MutableRefObject,
  Ref,
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
      // console.log({ control: control.current });
    }
  }, [dom, controlRef]);

  // @ts-ignore
  return <OrbitControls ref={controlRef} domElement={dom.current} />;
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
      {children}
    </Canvas>
  );
};

export default LCanvas;
