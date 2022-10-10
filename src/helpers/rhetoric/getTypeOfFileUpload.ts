import { LoaderType } from "./getLoader";

export function getTypeOfFileUpload(fileName: string): LoaderType | null {
  const findIndex = [
    fileName.match(/\.(gltf|glb)$/),
    fileName.match(/\.obj$/),
    fileName.match(/\.fbx$/),
  ].findIndex((b) => b);
  return findIndex !== -1
    ? (["gltf", "obj", "fbx"][findIndex] as LoaderType)
    : null;
}
