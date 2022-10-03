/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export default function Spatula(props: GroupProps) {
  const group = useRef();

  // @ts-ignore
  const { nodes, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/cooking-spatula/model.gltf"
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh_cookingSpatula.geometry}
        material={materials.brown}
      />
      <mesh
        geometry={nodes.Mesh_cookingSpatula_1.geometry}
        material={materials.white}
      />
    </group>
  );
}

useGLTF.preload(
  "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/cooking-spatula/model.gltf"
);