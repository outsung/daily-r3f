/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function HoneyModel(props: GroupProps) {
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/honey/model.gltf"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh_honey.geometry}
        material={materials.brownLight}
      />
      <mesh
        geometry={nodes.Mesh_honey_1.geometry}
        material={materials.brownDark}
      />
      <mesh
        geometry={nodes.Mesh_honey_2.geometry}
        material={materials.yellow}
      />
    </group>
  );
}

useGLTF.preload(
  "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/honey/model.gltf"
);
