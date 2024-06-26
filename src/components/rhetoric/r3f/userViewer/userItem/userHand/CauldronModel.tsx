/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Sphere015: THREE.Mesh;
    Sphere015_1: THREE.Mesh;
    Sphere015_2: THREE.Mesh;
    Sphere015_3: THREE.Mesh;
  };
  materials: {
    ["Black.005"]: THREE.MeshStandardMaterial;
    GreenLight: THREE.MeshStandardMaterial;
    Green: THREE.MeshStandardMaterial;
    BrownDark: THREE.MeshStandardMaterial;
  };
};

export function CauldronModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef();

  // @ts-ignore
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cauldron/model.gltf"
  ) as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Sphere015.geometry}
        material={materials["Black.005"]}
      />
      <mesh
        geometry={nodes.Sphere015_1.geometry}
        material={materials.GreenLight}
      />
      <mesh geometry={nodes.Sphere015_2.geometry} material={materials.Green} />
      <mesh
        geometry={nodes.Sphere015_3.geometry}
        material={materials.BrownDark}
      />
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cauldron/model.gltf"
);
