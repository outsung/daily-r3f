import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Euler, Quaternion } from "three";

interface SlerpProps {
  children: React.ReactNode;
}

export function Slerp({ children, ...args }: SlerpProps) {
  const group = useRef<THREE.Group>({} as THREE.Group);
  const { viewport } = useThree();

  const [rotationEuler, rotationQuaternion] = useMemo(
    () => [new Euler(0, 0, 0), new Quaternion(0, 0, 0, 0)],
    []
  );

  useFrame(({ mouse }) => {
    if (!group.current) return;

    // console.log(group.current.quaternion);

    const x = (mouse.x * viewport.width) / 100;
    const y = -(mouse.y * viewport.height) / 100;

    rotationEuler.set(y, x, 0);
    rotationQuaternion.setFromEuler(rotationEuler);
    // group.current.quaternion.slerp
    group.current.quaternion.slerp(rotationQuaternion, 0.05);
  });

  return (
    // @ts-ignore
    <group {...args} ref={group}>
      {children}
    </group>
  );
}
