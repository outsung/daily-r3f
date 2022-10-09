// 모델 로더
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// gui 텍스쳐 로딩
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// 압축 디코드 로더
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// 메쉬 압축 디코드 로더
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export type LoaderType = "obj" | "gltf" | "fbx";
export function getLoader({
  type,
  manager,
}: {
  type: LoaderType;
  manager: any;
}) {
  const typeIndex = { gltf: 0, fbx: 1, obj: 2 }[type];

  let loader = [
    new GLTFLoader(manager)
      .setCrossOrigin("anonymous")
      .setDRACOLoader(new DRACOLoader(manager).setDecoderPath("assets/wasm/")),
    new FBXLoader(manager).setCrossOrigin("anonymous"),
    new OBJLoader(manager).setCrossOrigin("anonymous"),
  ][typeIndex];

  return loader;
}
