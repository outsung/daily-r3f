/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function BearModel(props: GroupProps) {
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.character_bear.geometry}
        material={nodes.character_bear.material}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <mesh
          geometry={nodes.character_bearArmLeft.geometry}
          material={nodes.character_bearArmLeft.material}
          position={[0.2, 0, -0.63]}
        />
        <mesh
          geometry={nodes.character_bearArmRight.geometry}
          material={nodes.character_bearArmRight.material}
          position={[-0.2, 0, -0.63]}
        />
        <group position={[0, 0, -0.7]}>
          <mesh
            geometry={nodes.Cube1337.geometry}
            material={materials["Black.025"]}
          />
          <mesh
            geometry={nodes.Cube1337_1.geometry}
            material={nodes.Cube1337_1.material}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
);
