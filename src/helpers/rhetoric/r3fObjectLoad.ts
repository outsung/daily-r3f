import { Group, LoaderUtils, LoadingManager } from "three";
import { getLoader, LoaderType } from "./getLoader";

interface R3fObjectLoadProps {
  fileURL: string;
  rootPath: string;
  file: File;
  type: LoaderType;
}
export async function r3fObjectLoad({
  fileURL,
  rootPath,
  file,
  type,
}: R3fObjectLoadProps) {
  const baseURL = LoaderUtils.extractUrlBase(fileURL);

  try {
    const scene = await load({ fileURL, rootPath, file, type, baseURL });
    return scene;
  } catch (e) {
    console.error(e, "e");
    return null;
  }
}

interface LoadProps extends R3fObjectLoadProps {
  baseURL: string;
}
const load = ({ fileURL, rootPath, file, type, baseURL }: LoadProps) => {
  return new Promise<Group>((resolve, reject) => {
    const manager = new LoadingManager();
    // Intercept and override relative URLs.
    manager.setURLModifier((url) => {
      // URIs in a glTF file may be escaped, or not. Assume that assetMap is
      // from an un-escaped source, and decode all URIs before lookups.
      // See: https://github.com/donmccurdy/three-gltf-viewer/issues/146

      const blobURL = URL.createObjectURL(file);
      blobURLs.push(blobURL);

      return url;
    });

    const loader = getLoader({ type, manager });
    const blobURLs: any[] = [];

    loader.load(
      fileURL,
      (model: any) => {
        console.log({ model });
        const scene = model?.scenes ? model.scene || model.scenes[0] : model;

        scene.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          /* max to webgl 회전 보정 */
          // if (child.isGroup) {
          //   child.rotation.x = Math.PI;
          //   child.rotation.y = Math.PI;
          //   child.rotation.z = Math.PI;
          // }
        });

        if (!scene) {
          // Valid, but not supported by this viewer.
          throw new Error(
            "파일에 Scene이 포함 되어있지 않거나, 3d 모델이 존재 하지 않습니다."
          );
        }

        blobURLs.forEach(URL.revokeObjectURL);
        // See: https://github.com/google/draco/issues/349
        // DRACOLoader.releaseDecoderModule();
        resolve(scene);
      },
      undefined,
      reject
    );
  });
};
