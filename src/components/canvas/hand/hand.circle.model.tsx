import { Cylinder, Sphere } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

export default function Model({ position }: { position: any }) {
  const ref = useRef<Group>(null);

  useEffect(() => {
    ref.current.rotateX(Math.PI);
  }, []);

  const 손바닥 = [0, 1, 2, 5, 9, 13, 17];
  const 엄지 = [3, 4];
  const 검지 = [6, 7, 8];
  const 중지 = [10, 11, 12];
  const 약지 = [14, 15, 16];
  const 새끼 = [18, 19, 20];

  const getColor = (i: number) => {
    if (손바닥.includes(i)) {
      return "red";
    } else if (엄지.includes(i)) {
      return "blue";
    } else if (검지.includes(i)) {
      return "green";
    } else if (중지.includes(i)) {
      return "yellow";
    } else if (약지.includes(i)) {
      return "pink";
    } else if (새끼.includes(i)) {
      return "orange";
    } else {
      return "black";
    }
  };
  // color={getColor(i)}
  return (
    <group ref={(r) => (ref.current = r)}>
      {position &&
        position.map((c, i) => (
          <Sphere scale={0.1} position={c}>
            <meshBasicMaterial transparent opacity={0.8} color={getColor(i)} />
          </Sphere>
        ))}
    </group>
  );
}
