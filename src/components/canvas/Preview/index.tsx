import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const PREVIEW_FILE_BASE_PATH = "/models/previewable/";
interface PreviewProps {
  filePath: string;
}
const Preview = ({ filePath }: PreviewProps) => {
  const isObjFile = filePath.endsWith("obj");

  if (isObjFile) {
    return <OBJPreview filePath={filePath} />;
  }

  return <GLTFPreview filePath={filePath} />;
};

function GLTFPreview({ filePath }: PreviewProps) {
  const { scene } = useGLTF(`${PREVIEW_FILE_BASE_PATH}${filePath}`);

  return (
    <>
      <group>
        <primitive object={scene} />
      </group>
      <ambientLight />
    </>
  );
}

function OBJPreview({ filePath }: PreviewProps) {
  const obj = useLoader(OBJLoader, `${PREVIEW_FILE_BASE_PATH}${filePath}`);

  return (
    <>
      <group>
        <primitive object={obj} />
      </group>
      <ambientLight />
    </>
  );
}

export default Preview;
